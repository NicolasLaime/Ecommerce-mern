package com.nicolaslaime.ecommerce.repository;

import com.nicolaslaime.ecommerce.entity.Role;
import com.nicolaslaime.ecommerce.entity.RoleName;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;


@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByName(RoleName name);
}
