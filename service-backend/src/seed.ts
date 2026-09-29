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
import {
  User,
  PersonalData,
  TourCoin,
  Tour,
  Club,
  CalendarClub,
  Tournament,
  Category,
  Team
} from "./entity";
import { UserRole } from "./entity/User";
import { Status } from "./entity/Tournament";
import { Manager } from "./helpers/manager";
import { generateTourCode } from "./helpers/generateTourCode.helper";

async function seed() {
  console.log("🌱 Starting seed process...\n");

  await AppDataSource.initialize();
  console.log("✅ Database connected");

  const userService = new UserService();
  const tourService = new TourService();
  const clubService = new ClubService();
  const tournamentService = new TournamentService();
  const teamService = new TeamService();
  const manager = Manager.getInstance();

  try {
    // ─── 1. Admin ───────────────────────────────────────────────
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

    // ─── 2. 24 Players ──────────────────────────────────────────
    console.log("\n📝 Creating 24 Players...");

    const playerNames = [
      { first: "Juan", last: "García" },
      { first: "Carlos", last: "Martínez" },
      { first: "Pedro", last: "Fernández" },
      { first: "Miguel", last: "Hernández" },
      { first: "Luis", last: "Ramírez" },
      { first: "Jorge", last: "Torres" },
      { first: "Andrés", last: "Flores" },
      { first: "Diego", last: "Reyes" },
      { first: "Pablo", last: "Morales" },
      { first: "Sergio", last: "Jiménez" },
      { first: "Roberto", last: "Ruiz" },
      { first: "Fernando", last: "Díaz" },
      { first: "Alejandro", last: "Vargas" },
      { first: "Marcos", last: "Castro" },
      { first: "Nicolás", last: "Ortega" },
      { first: "Matías", last: "Rojas" },
      { first: "Sebastián", last: "Núñez" },
      { first: "Tomás", last: "Molina" },
      { first: "Gonzalo", last: "Herrera" },
      { first: "Emilio", last: "Medina" },
      { first: "Rodrigo", last: "Aguilar" },
      { first: "Facundo", last: "Suárez" },
      { first: "Ignacio", last: "Romero" },
      { first: "Bruno", last: "Guerrero" },
    ];

    const players: User[] = [];

    for (let i = 0; i < playerNames.length; i++) {
      const p = playerNames[i];
      const user = new User();
      user.username = `${p.first.toLowerCase().replace("á", "a").replace("é", "e").replace("í", "i").replace("ó", "o").replace("ú", "u")}${i + 1}`;
      user.email = `${user.username}@test.com`;
      user.password = "password123";
      await user.hashPassword(user.password);
      user.role = UserRole.USER;
      user.isSingle = false;

      const perData = new PersonalData();
      perData.firstName = p.first;
      perData.lastName = p.last;
      perData.phoneNumber = `+346${String(i + 1).padStart(8, "0")}`;
      perData.location = "Madrid";

      const coin = new TourCoin();
      coin.coins = 0;

      const created = await userService.create(user, perData, coin);
      players.push(created);
      console.log(
        `   ✅ Player ${i + 1}/24: ${created.username} (${created.id})`,
      );
    }

    // ─── 3. Tour ────────────────────────────────────────────────
    console.log("\n📝 Creating Tour...");
    const tour = new Tour();
    tour.title = "Tour Golden Point 2026";
    tour.tourCode = await generateTourCode();

    const createdTour = await tourService.create(tour, admin, []);
    console.log(
      `   ✅ Tour created: ${createdTour.title} (Code: ${createdTour.tourCode})`,
    );

    // Join all 24 players to the tour
    console.log("\n📝 Joining players to tour...");
    for (const player of players) {
      await tourService.joinUserToTour(player, createdTour.tourCode);
      console.log(`   ✅ ${player.username} joined tour`);
    }

    // ─── 4. Club ────────────────────────────────────────────────
    console.log("\n📝 Creating Club...");
    const club = new Club();
    club.clubName = "Lawn Padel";
    club.location = "Calle Falsa 123, Madrid";

    const calendarClub = new CalendarClub();
    calendarClub.availableFrom = new Date("2026-03-20T08:00:00Z").toISOString();
    calendarClub.availableTo = new Date("2026-12-31T22:00:00Z").toISOString();

    const createdClub = await clubService.create(club, calendarClub, 4);
    console.log(
      `   ✅ Club created: ${createdClub.clubName} (${createdClub.id})`,
    );

    // Link club to tour (required for starting tournament)
    console.log("\n📝 Adding club to tour...");
    const tourRepo = AppDataSource.getRepository(Tour);
    const fullTour = await tourRepo.findOne({
      where: { id: createdTour.id },
      relations: ["clubs"],
    });
    if (fullTour) {
      fullTour.clubs.push(createdClub);
      await tourRepo.save(fullTour);
      console.log(`   ✅ Club added to tour`);
    }

    // ─── 5. Tournament ──────────────────────────────────────────
    console.log("\n📝 Creating Tournament...");
    const tournament = new Tournament();
    tournament.title = "Torneo Masculino-Septima 2026";
    tournament.master = 100;
    tournament.isDeleted = false;
    tournament.status = Status.PENDING;

    const category = new Category();
    category.category = "Masculino-Septima";
    category.gender = "Masculino";

    const createdTournament = await tournamentService.create(
      tournament,
      createdTour.id,
      [category],
    );
    console.log(`   ✅ Tournament created: ${createdTournament.title}`);
    console.log(`   ✅ Category: Masculino-Septima`);

    // ─── 6. 12 Teams (2 players each, all Masculino-Septima) ────
    console.log("\n📝 Creating 12 Teams...");

    const tournamentRepo = AppDataSource.getRepository(Tournament);
    const fullTournament = await tournamentRepo.findOne({
      where: { id: createdTournament.id },
      relations: ["categories"],
    });

    if (!fullTournament) throw new Error("Could not find created tournament");

    const teams: Team[] = [];

    for (let i = 0; i < players.length; i += 2) {
      const player1 = players[i];
      const player2 = players[i + 1];

      const team = new Team();
      team.teamName = `${player1.personalData?.lastName ?? player1.username} / ${player2.personalData?.lastName ?? player2.username}`;
      team.category = "Masculino-Septima";

      const createdTeam = await teamService.create(
        team,
        [player1.id, player2.id],
        manager,
        fullTournament,
      );
      teams.push(createdTeam);
      console.log(
        `   ✅ Team ${teams.length}/12: ${createdTeam.teamName} (${createdTeam.id})`,
      );
    }

    // ─── Summary ────────────────────────────────────────────────
    console.log("\n" + "=".repeat(50));
    console.log("🎉 SEED COMPLETED SUCCESSFULLY!");
    console.log("=".repeat(50));
    console.log("\n📊 Summary:");
    console.log(`   • Admin:      admin / admin123`);
    console.log(
      `   • Players:    ${players.length} users (password: password123)`,
    );
    console.log(`   • Tour Code:  ${createdTour.tourCode}`);
    console.log(`   • Tournament: ${createdTournament.title}`);
    console.log(`   • Category:   Masculino-Septima`);
    console.log(`   • Teams:      ${teams.length} (2 players each)`);
    console.log("\n🚀 You can now:");
    console.log("   1. Start the tournament (POST /tournament/start)");
    console.log("   2. Generate groups and matches");
    console.log("   3. Set results and test the match card UI\n");
  } catch (error) {
    console.error("\n❌ Seed failed:", error);
    throw error;
  } finally {
    await AppDataSource.destroy();
    console.log("\n🔌 Database connection closed");
  }
}

seed().catch(console.error);
