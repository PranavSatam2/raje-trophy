package com.trophy.Trophy;


import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/rajetrophy")
@CrossOrigin(origins = "http://localhost:3000") // ✅ allow React frontend
//@CrossOrigin(origins = "http://localhost:8089")
public class StoreAccController {

    public StoreAccController() {
System.out.println("StoreAccController Initialized");
    
    }

	@Autowired
    private StoreAccService service;

    @GetMapping
    public List<Trophy> getAllStoreAcceptances() {
        return service.getAllStoreAcceptances();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Trophy> getStoreAcceptanceById(@PathVariable Long id) {
        Trophy storeAcc = service.getStoreAcceptanceById(id);
        return ResponseEntity.ok(storeAcc);
        //return service.getStoreAcceptanceById(id);
    }

    @PostMapping
    public Trophy saveStoreAcceptance(@RequestBody Trophy storeAcceptance) {
        return service.saveStoreAcceptance(storeAcceptance);
    }


    @PutMapping("/{id}")
    public ResponseEntity<Trophy> updateTrophy(@PathVariable Long id, @RequestBody Trophy trophy) {
        Trophy updated = service.updateStoreAcceptance(id, trophy);
        return ResponseEntity.ok(updated);
    }
//    @DeleteMapping("/{id}")
//    public String deleteStoreAcceptance(@PathVariable Long id) {
//        service.deleteStoreAcceptance(id);
//        return "Record deleted successfully!";
//    }
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteStoreAcceptance(@PathVariable Long id) {
      service.deleteStoreAcceptance(id);
        return ResponseEntity.ok("Deleted storeAcceptance with ID: " + id);
    }
}
