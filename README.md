# Ecommerce - Spring Boot & React

Este proyecto es una aplicación de ecommerce que integra un **backend** desarrollado con **Spring Boot** y un **frontend** creado en **React**. Se implementa autenticación y autorización mediante **Spring Security** para diferenciar entre usuarios y administradores. El administrador dispone de un panel CRUD para gestionar los productos, mientras que el usuario puede interactuar con el sistema a través de un carrito de compras que utiliza `localStorage` y una simulación del proceso de compra.

---


## Características

- **Autenticación y Autorización:**  
  - Implementado con **Spring Security** para diferenciar entre usuarios y administradores.
  
- **Panel de Administración (CRUD):**  
  - Permite **crear**, **leer**, **actualizar** y **eliminar** productos.
  - Los cambios se reflejan en el frontend de manera dinámica.

- **Carrito de Compras:**  
  - Lógica de carrito implementada con **localStorage**.
  - Simulación del proceso de compra en el frontend.

- **Notificaciones y Comunicación:**  
  - Uso de **Toastify** para mostrar notificaciones al usuario.
  - Consumo de API mediante **Axios**.

---

## Tecnologías Utilizadas

### Backend
- **Java** con **Spring Boot**
- **Spring Security**
- (Posible uso de **JPA/Hibernate** para la persistencia)

### Frontend
- **React**
- **Tailwind CSS**
- **Toastify**
- **Axios**

---

# Próximas Funcionalidades


-Integración de Pasarela de Pago:

-Añadir la funcionalidad para procesar pagos de forma real.
-Rediseño del Frontend:

-Mejorar y actualizar el diseño de la interfaz de usuario.


---

## Instalación y Ejecución

### Prerrequisitos

- **Java 11** o superior
- **Node.js** y **npm** (o **yarn**)
- Base de datos (por ejemplo, MySQL o PostgreSQL) si se requiere configuración adicional en el backend

### Backend

1. **Clonar el repositorio:**

   ```bash
   git clone https://github.com/tu-usuario/tu-repo.git
   cd tu-repo/backend
