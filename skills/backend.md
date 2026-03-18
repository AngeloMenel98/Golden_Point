# Backend Skill: Golden Point (TypeScript, Express, TypeORM)

## Contexto del Proyecto
Golden Point es un sistema de gestión de torneos de pádel/tenis. El backend está construido sobre Node.js con Express y TypeORM.

## Arquitectura y Patrones
- **Lenguaje:** TypeScript.
- **ORM:** TypeORM con decoradores y Repositories personalizados.
- **Estructura:** Controllers -> Services -> Repositories -> Entities.
- **Validación:** Se utiliza class-validator en las entidades y DTOs.
- **Manejo de Errores:** Se usa la clase ServiceCodeError con códigos definidos en src/constants/codeErrors.ts.

## Convenciones de Código
- **Entidades:** Deben estar decoradas con @Entity() y usar decoradores de TypeORM para relaciones.
- **Servicios:** 
  - Deben manejar la lógica de negocio y llamar a otros servicios si es necesario.
  - Los servicios secundarios deben instanciarse en el constructor.
- **Controladores:** Deben limitarse a recibir la request, llamar al servicio correspondiente y retornar la response.
- **Naming:** CamelCase para variables y funciones, PascalCase para clases y archivos.

## Reglas de Oro
- Nunca accedas al Repository directamente desde el Controller; usa siempre un Service.
- Valida siempre los datos antes de persistirlos.
- Los estados de los torneos son PENDING, IN_PROGRESS, y FINISH.