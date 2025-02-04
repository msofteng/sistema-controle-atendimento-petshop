package com.metaway.petshop.entity;

import static com.fasterxml.jackson.annotation.JsonInclude.Include.NON_EMPTY;
import static jakarta.persistence.GenerationType.IDENTITY;
import static jakarta.persistence.CascadeType.ALL;

import java.time.LocalDate;
import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.metaway.petshop.enums.Perfil;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@Entity
@NoArgsConstructor
@JsonInclude(NON_EMPTY)
public class UsuarioEntity implements UserDetails {
	@Id
	@GeneratedValue(strategy = IDENTITY)
	private Long id;
	private String nome;
	private String password;

	@Enumerated(EnumType.STRING)
	private Perfil perfil;

	@Column(nullable = true)
	private String cpf;

	@Column(columnDefinition = "TEXT", nullable = true)
	private String foto;

	@JsonFormat(pattern = "yyyy-MM-dd")
	private LocalDate dataCadastro;

	@OneToMany(mappedBy = "cliente", cascade = ALL, fetch = FetchType.EAGER)
	@JsonIgnoreProperties(value = "cliente", allowSetters = true)
	private List<ContatoEntity> contatos;

	@OneToMany(mappedBy = "cliente", cascade = ALL, fetch = FetchType.EAGER)
	@JsonIgnoreProperties(value = "cliente", allowSetters = true)
	private List<EnderecoEntity> enderecos;

	@OneToMany(mappedBy = "cliente", cascade = ALL, fetch = FetchType.EAGER)
	@JsonIgnoreProperties(value = "cliente", allowSetters = true)
	private List<PetEntity> pets;

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return List.of();
	}

	public String getPassword() {
		return password;
	}

	@Override
	public String getUsername() {
		return nome;
	}

	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@Override
	public boolean isEnabled() {
		return true;
	}
}