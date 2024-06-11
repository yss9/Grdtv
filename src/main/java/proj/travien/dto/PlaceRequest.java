package proj.travien.dto;

import java.util.List;

public class PlaceRequest {
    private List<PlaceDto> places;

    public List<PlaceDto> getPlaces() {
        return places;
    }

    public void setPlaces(List<PlaceDto> places) {
        this.places = places;
    }

    public static class PlaceDto {
        private String name;
        private String address;

        // Constructors, getters and setters
        public PlaceDto() {}

        public PlaceDto(String name, String address) {
            this.name = name;
            this.address = address;
        }

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public String getAddress() {
            return address;
        }

        public void setAddress(String address) {
            this.address = address;
        }
    }
}
