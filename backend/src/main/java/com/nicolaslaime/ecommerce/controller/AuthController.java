package com.nicolaslaime.ecommerce.controller;

import com.nicolaslaime.ecommerce.entity.Role;
import com.nicolaslaime.ecommerce.entity.RoleName;
import com.nicolaslaime.ecommerce.entity.User;
import com.nicolaslaime.ecommerce.repository.RoleRepository;
import com.nicolaslaime.ecommerce.repository.UserRepository;
import com.nicolaslaime.ecommerce.security.JwtUtils;
import com.nicolaslaime.ecommerce.service.UserDetailsServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private JwtUtils jwtUtils;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {

        System.out.println("🔹 Intentando registrar usuario: " + user.getEmail());


        // Validar si falta algún campo
        if (user.getEmail() == null || user.getPassword() == null || user.getUsername() == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Faltan datos obligatorios");
        }

        // Verificamos si el usuario ya existe
        if (userRepository.existsByEmail(user.getEmail())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Usuario ya registrado");
        }

        // Asignar roles
        Set<Role> roles = new HashSet<>();
        if ("nicolaime100@gmail.com".equals(user.getEmail())) {
            Role adminRole = roleRepository.findByName(RoleName.ROLE_ADMIN)
                    .orElseThrow(() -> new RuntimeException("Rol ADMIN no encontrado"));
            roles.add(adminRole);
        } else {
            Role userRole = roleRepository.findByName(RoleName.ROLE_USER)
                    .orElseThrow(() -> new RuntimeException("Rol USER no encontrado"));
            roles.add(userRole);
        }

        // Encriptar la contraseña
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setRoles(roles);

        // Guardamos el usuario en la base de datos
        try {
            userRepository.save(user);
            return ResponseEntity.status(HttpStatus.CREATED).body("Usuario registrado con éxito");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al guardar el usuario: " + e.getMessage());
        }
    }







    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user) {
        User existingUser = userRepository.findByEmail(user.getEmail())
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        if (!passwordEncoder.matches(user.getPassword(), existingUser.getPassword())) {
            System.out.println("Intento de login fallido para: " + user.getEmail());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Credenciales incorrectas");
        }

        List<String> roles = existingUser.getRoles().stream()
                .map(role -> role.getName().toString())
                .collect(Collectors.toList());

        UserDetails userDetails = new org.springframework.security.core.userdetails.User(
                existingUser.getEmail(),
                existingUser.getPassword(),
                roles.stream().map(SimpleGrantedAuthority::new).collect(Collectors.toList())
        );

        String token = jwtUtils.generateToken(userDetails);

        // 🔹 Log para ver quién se loguea
        System.out.println("Usuario logueado: " + existingUser.getEmail() + " | Roles: " + roles);

        return ResponseEntity.ok().body(Map.of(
                "token", token,
                "roles", roles
        ));
    }

}
