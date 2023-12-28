package romerofinalproj.romerofp;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/map")
public class EvacuationCenterController {

    @GetMapping("/evacuation-centers")
    public ResponseEntity<List<Map<String, Object>>> getEvacuationCenters(@RequestParam List<String> barangays) {
      
        List<Map<String, Object>> result = new ArrayList<>();
        for (String barangay : barangays) {
            Map<String, Object> evacuationCenter = new HashMap<>();
            evacuationCenter.put("barangay", barangay);
            evacuationCenter.put("coordinates", getCoordinatesForBarangay(barangay));
            result.add(evacuationCenter);
        }
        return ResponseEntity.ok(result);
    }

    private double[] getCoordinatesForBarangay(String barangay) {
        // coordinates
        if ("Bonifacio".equalsIgnoreCase(barangay)) {
            return new double[] { 13.5616, 123.1406 };
        } else if ("Lupi".equalsIgnoreCase(barangay)) {
            return new double[] { 13.5351, 123.1493 };
        }  else if ("Del Pilar".equalsIgnoreCase(barangay)) {
            return new double[] { 13.5674, 123.1462 };
        } else if ("Beberon".equalsIgnoreCase(barangay)) {
            return new double[] { 13.5435, 123.1441 };
        } else if ("Rizal".equalsIgnoreCase(barangay)) {
            return new double[] { 13.5612, 123.1438 };
        } else if ("Pinamasagan".equalsIgnoreCase(barangay)) {
            return new double[] { 13.4728, 123.1236 };
        } else if ("Bocal".equalsIgnoreCase(barangay)) {
            return new double[] { 13.5246, 123.1267 };
        }

        return new double[] { 13.5661, 123.1422 }; // Default coordinates
    }
}
