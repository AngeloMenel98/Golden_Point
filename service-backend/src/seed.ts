/**
 * Seed Script - Creates test data for Golden Point Backend
 * 
 * Run with: npx ts-node src/seed.ts
 * Or: npm run seed
 */

import "dotenv/config";
import "reflect-metadata";

import { AppDataSource } from "./data-source";
import { UserService } from "./services/userService";
import { TourService } from "./services/tourService";
import { ClubService } from "./services/clubService";
import { TournamentService } from "./services/tournamentService";
import { TeamService } from "./services/teamService";
import { User, PersonalData, TourCoin, Tour, Club, CalendarClub, Tournament, Category, Team } from "./entity";
import { UserRole } from "./entity/User";
import { Status } from "./entity/Tournament";
import { Manager } from "./helpers/manager";
import { generateTourCode } from "./helpers/generateTourCode.helper";

async function seed() {
  console.log("🌱 Starting seed process...\n");

  // Initialize database connection
  await AppDataSource.initialize();
  console.log("✅ Database connected");

  const userService = new UserService();
  const tourService = new TourService();
  const clubService = new ClubService();
  const tournamentService = new TournamentService();
  const teamService = new TeamService();
  const manager = Manager.getInstance();

  try {
    // 1. Create Admin User
    console.log("\n📝 Creating Admin User...");
    const adminUser = new User();
    adminUser.username = "admin";
    adminUser.email = "admin@goldenpoint.com";
    adminUser.password = "admin123";
    await adminUser.hashPassword(adminUser.password);
    adminUser.role = UserRole.ADMIN;
    adminUser.isSingle = false;

    const adminPerData = new PersonalData();
    adminPerData.firstName = "Admin";
    adminPerData.lastName = "User";
    adminPerData.phoneNumber = "+34600000000";
    adminPerData.location = "Madrid";

    const adminCoin = new TourCoin();
    adminCoin.coins = 0;

    const admin = await userService.create(adminUser, adminPerData, adminCoin);
    console.log(`   ✅ Admin created: ${admin.username} (${admin.id})`);

    // 2. Create Regular Users (Players)
    console.log("\n📝 Creating Players...");
    const players: User[] = [];
    const playerNames = [
      { first: "Juan", last: "García" },
      { first: "María", last: "López" },
      { first: "Carlos", last: "Martínez" },
      { first: "Ana", last: "Rodríguez" },
      { first: "Pedro", last: "Fernández" },
      { first: "Laura", last: "González" },
      { first: "Miguel", last: "Hernández" },
      { first: "Sofia", last: "Pérez" },
    ];

    for (let i = 0; i < playerNames.length; i++) {
      const p = playerNames[i];
      const user = new User();
      user.username = `${p.first.toLowerCase()}${i + 1}`;
      user.email = `${p.first.toLowerCase()}${i + 1}@test.com`;
      user.password = "password123";
      await user.hashPassword(user.password);
      user.role = UserRole.USER;
      user.isSingle = false;

      const perData = new PersonalData();
      perData.firstName = p.first;
      perData.lastName = p.last;
      perData.phoneNumber = `+346000000${String(i + 1).padStart(2, '0')}`;
      perData.location = "Madrid";

      const coin = new TourCoin();
      coin.coins = 0;

      const created = await userService.create(user, perData, coin);
      players.push(created);
      console.log(`   ✅ Player created: ${created.username} (${created.id})`);
    }

    // 3. Create Tour
    console.log("\n📝 Creating Tour...");
    const tour = new Tour();
    tour.title = "Torneo de Padel Verano 2026";
    tour.tourCode = await generateTourCode();

    const createdTour = await tourService.create(tour, admin, []);
    console.log(`   ✅ Tour created: ${createdTour.title} (Code: ${createdTour.tourCode})`);

    // Join players to tour
    console.log("\n📝 Joining players to tour...");
    for (const player of players) {
      await tourService.joinUserToTour(player, createdTour.tourCode);
      console.log(`   ✅ ${player.username} joined tour`);
    }

    // 4. Create Club with CalendarClub
    console.log("\n📝 Creating Club...");
    const club = new Club();
    club.clubName = "Club Deportivo Padel Center";
    club.location = "Calle Falsa 123, Ciudad";

    const calendarClub = new CalendarClub();
    // Dates should be strings in ISO format
    calendarClub.availableFrom = new Date("2026-03-20T08:00:00Z").toISOString();
    calendarClub.availableTo = new Date("2026-04-30T22:00:00Z").toISOString();

    const createdClub = await clubService.create(club, calendarClub, 4);
    console.log(`   ✅ Club created: ${createdClub.clubName} (${createdClub.id})`);
    console.log(`   ✅ 4 courts created`);

    // 5. Create Categories
    console.log("\n📝 Creating Tournament with Categories...");
    const tournament = new Tournament();
    tournament.title = "Torneo de Prueba - Categorías Mixtas";
    tournament.master = 100;
    tournament.isDeleted = false;
    tournament.status = Status.PENDING;

    const categories: Category[] = [];
    const categoryData = [
      { category: "Masculino-5", gender: "Masculino" },
      { category: "Masculino-4", gender: "Masculino" },
      { category: "Femenino-5", gender: "Femenino" },
    ];

    for (const cat of categoryData) {
      const category = new Category();
      category.category = cat.category;
      category.gender = cat.gender;
      categories.push(category);
    }

    const createdTournament = await tournamentService.create(tournament, createdTour.id, categories);
    console.log(`   ✅ Tournament created: ${createdTournament.title}`);
    console.log(`   ✅ Categories: ${categories.map(c => c.category).join(", ")}`);

    // 6. Create Teams (2 players each)
    console.log("\n📝 Creating Teams...");
    const teams: Team[] = [];
    
    // Create teams - need to use the actual tournament entity
    const tournamentRepo = AppDataSource.getRepository(Tournament);
    const fullTournament = await tournamentRepo.findOne({
      where: { id: createdTournament.id },
      relations: ["categories"]
    });

    if (!fullTournament) {
      throw new Error("Could not find created tournament");
    }

    for (let i = 0; i < players.length - 1; i += 2) {
      const player1 = players[i];
      const player2 = players[i + 1];
      
      const team = new Team();
      team.teamName = `${player1.username}-${player2.username}`;
      team.category = categories[i % categories.length].category; // Alternate categories

      const createdTeam = await teamService.create(
        team,
        [player1.id, player2.id],
        manager,
        fullTournament
      );
      teams.push(createdTeam);
      console.log(`   ✅ Team created: ${createdTeam.teamName} (Category: ${createdTeam.category})`);
    }

    console.log("\n" + "=".repeat(50));
    console.log("🎉 SEED COMPLETED SUCCESSFULLY!");
    console.log("=".repeat(50));
    console.log("\n📊 Summary:");
    console.log(`   • Admin User: admin / admin123`);
    console.log(`   • Players: ${players.length} (password: password123)`);
    console.log(`   • Tour Code: ${createdTour.tourCode}`);
    console.log(`   • Tournament: ${createdTournament.title}`);
    console.log(`   • Teams: ${teams.length}`);
    console.log("\n🚀 You can now:");
    console.log("   1. Start the tournament (POST /tournament/start)");
    console.log("   2. Create matches and set results");
    console.log("   3. Test knockout automation\n");

  } catch (error) {
    console.error("\n❌ Seed failed:", error);
    throw error;
  } finally {
    await AppDataSource.destroy();
    console.log("\n🔌 Database connection closed");
  }
}

seed().catch(console.error);
