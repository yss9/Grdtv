package proj.travien.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import proj.travien.domain.Addresses;

public interface AddressesRepository extends JpaRepository<Addresses, Long> {

}
