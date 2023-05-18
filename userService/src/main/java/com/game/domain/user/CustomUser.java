package com.game.domain.user;

import java.util.Collection;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.SQLDelete;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@Entity
@ToString
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "user")
@SQLDelete(sql = "UPDATE user SET is_deleted = true WHERE id = ?")
public class CustomUser implements UserDetails {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private Long id;

	@Column(name = "uid", nullable = false)
	private String uid;

	@Column(name = "birth_date", nullable = false)
	private String birthDate;

	@Column(name = "profile_path")
	private String profilePath;

	@Column(name = "is_deleted", nullable = false)
	private Boolean isDeleted = false;

	public CustomUser(String uid, String birthDate) {
		this.uid = uid;
		this.birthDate = birthDate;
	}

	public void updateProfileImage(String profilePath) {
		this.profilePath = profilePath;
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return null;
	}

	@Override
	public String getPassword() {
		return null;
	}

	@Override
	public String getUsername() {
		return uid;
	}

	@Override
	public boolean isAccountNonExpired() {
		return false;
	}

	@Override
	public boolean isAccountNonLocked() {
		return false;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return false;
	}

	@Override
	public boolean isEnabled() {
		return false;
	}
}
