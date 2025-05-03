# QA Automation - Cypress

## 📋 Descripción

Suite de pruebas automatizadas para el sistema de gestión de comunicados implementada con Cypress, utilizando patrones de diseño modernos y mejores prácticas.

## 🛠 Requisitos Técnicos

### Prerrequisitos

- **Node.js**: v18.17.0 o superior  
- **npm**: v9.6.7 o superior  
- **Cypress**: v12.17.1 o superior  

## 🔧 Configuración Inicial

### Clonar el repositorio

```bash
git clone https://github.com/Leonardoamh/SchoolManagement.git
```

### Instalar dependencias

```bash
npm install
```

## 🚀 Ejecución de Pruebas

### Opción 1: Modo Interactivo (GUI)

```bash
npm test
```

Abre el Test Runner de Cypress para ejecución visual.

### Opción 2: Modo Headless (Chrome)

```bash
npm run regression:chrome cypress/e2e/Test/SM-announcements.cy.js
```

## ⚠️ Consideraciones Técnicas

### Horario de Ejecución

El caso `SM-01` puede fallar en horario nocturno (posterior a las 18:00 hs) debido a discrepancia entre:

- Fecha del sistema bajo prueba  
- Fecha local de Cypress  

## 🧱 Arquitectura del Proyecto

### Page Object Model

- Organización modular  
- Reutilización de código  
- Mantenibilidad mejorada  

### Custom Commands

- Gestión avanzada de tablas  
- Interceptación de APIs  

### Fixtures

- Datos estáticos para pruebas  
- Configuración de endpoints  

## 📌 Notas de Implementación

### Cobertura Actual

- Pruebas de interfaz para gestión de comunicados  

### Limitaciones Conocidas

- La funcionalidad de matrículas presenta inestabilidades
- La aplicacion no esta optimizada para automatizar, por lo que presenta incovenientes a la hora de hacer el proceso

> 💡 **Recomendación**: Ejecutar las pruebas en horario diurno para evitar inconsistencias por cambio de fecha.
