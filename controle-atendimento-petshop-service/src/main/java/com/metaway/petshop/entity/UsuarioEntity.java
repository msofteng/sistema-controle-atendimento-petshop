package com.metaway.petshop.entity;

import static com.fasterxml.jackson.annotation.JsonInclude.Include.NON_EMPTY;
import static jakarta.persistence.GenerationType.IDENTITY;
import static jakarta.persistence.CascadeType.ALL;

import java.time.LocalDate;
import java.util.*;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.fasterxml.jackson.annotation.*;
import com.metaway.petshop.enums.Perfil;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@Entity
@NoArgsConstructor
@JsonInclude(NON_EMPTY)
@JsonIgnoreProperties({
  "accountNonExpired",
  "accountNonLocked",
  "credentialsNonExpired",
  "enabled"
})
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
	@Generated
	public boolean isAccountNonExpired() {
		return true;
	}

	@Override
	@Generated
	public boolean isAccountNonLocked() {
		return true;
	}

	@Override
	@Generated
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@Override
	@Generated
	public boolean isEnabled() {
		return true;
	}
}