//
//  RestaurantItem.swift
//  DineAround
//
//  Created by Gold_Mac on 5/11/17.
//  Copyright © 2017 gold. All rights reserved.
//

import UIKit
import MapKit
import CoreLocation

public class Location: NSObject {
    
    public let locationID: Int!

    public let name: String?
    public let address: String?
    public let city: String?
    public let state: String?
    public let phone: String?
    public var website: String!

    public var cuisineTypes: [String]? = []

    public var imageURLs: [String]?
    public var images: [UIImage]?

    public var logoURL: String?
    public var logo: UIImage?

    // Required Map Pin Properties
    public var coordinate: CLLocationCoordinate2D
    
 
    init(dictionary: NSDictionary) {
        
        locationID = dictionary.safeInteger(forKeyPath: "id")
        
        name = dictionary.stringOrNil(forKeyPath: "name")
        address = dictionary.stringOrNil(forKeyPath: "address")
        city = "Ann Arbor"
        state = "MI"
        
        phone = "+1 (734) 333-6699"
        
        website = "http://yelp.com"
        
        logoURL = dictionary.stringOrNil(forKeyPath: "logo")
       
        if let imgURLs = dictionary.arrayOrNil(forKey: "photos" as NSCopying!) as? [NSDictionary] {
            
            var tempURLs: [String] = []
            
            for dict in imgURLs {
                if let url = dict.safeString(forKeyPath: "url") {
                    tempURLs.append(url)
                }
            }
            
            imageURLs = tempURLs
        }
        
        coordinate = g_currentLocation
        
        if let cuisineArray = dictionary.arrayOrNil(forKey: "cuisine_types" as NSCopying!) as? [NSDictionary] {
            
            var tempTypes: [String] = []
            
            for dict in cuisineArray {
                if let type = dict.stringOrNil(forKeyPath: "name") {
                    tempTypes.append(type)
                }
            }
            
            cuisineTypes = tempTypes
        }
        
        super.init()
    }
 
    
    public func getLocationId() -> Int {
        return self.locationID!
    }
    
    // MARK: - Location
    
    public func cityStateString() -> String {
        
        let cityStr = city ?? ""
        let stateStr = state ?? ""
        
        if cityStr != "" {
            if stateStr != "" {
                return String(format: "%@, %@", cityStr, stateStr)
            }
            return cityStr
        }
        return stateStr
    }

    
}
