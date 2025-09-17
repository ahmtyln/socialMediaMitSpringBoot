package com.app.socialmedia.repository;

import com.app.socialmedia.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User,Long> {
    User findByUserName(String userName);
}
