package com.game.domain.user;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.SQLDelete;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "user")
@SQLDelete(sql = "UPDATE user SET is_deleted = true WHERE id = ?")
public class User {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private Long id;

	@Column(name = "uid", nullable = false)
	private String uid;

	@Column(name = "birth_date", nullable = false)
	private String birthDate;

	@Column(name = "is_deleted")
	private Boolean isDeleted = false;

	@Column(name = "feature")
	private int feature = 0;

	@Builder
	public User(String uid, String birthDate, int feature) {
		this.uid = uid;
		this.birthDate = birthDate;
		this.feature = feature;
	}

	public void update(int feature) {
		this.feature = feature;
	}

}
