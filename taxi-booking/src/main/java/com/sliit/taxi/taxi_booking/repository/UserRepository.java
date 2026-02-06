package com.sliit.taxi.taxi_booking.repository;

import com.sliit.taxi.taxi_booking.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

/**
 * UserRepository
 * Provides the data access layer for the User entity.
 * Uses Spring Data JPA to perform CRUD operations and custom query methods.
 */
@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    /**
     * Find a user by their unique email address.
     * Useful for authentication and preventing duplicate registrations.
     * @param email The email address to search for.
     * @return An Optional containing the User if found, or empty if not.
     */
    Optional<User> findByEmail(String email);
}