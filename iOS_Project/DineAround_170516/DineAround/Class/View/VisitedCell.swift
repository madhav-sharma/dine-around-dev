//
//  VisitedCell.swift
//  DineAround
//
//  Created by Gold_Mac on 5/12/17.
//  Copyright © 2017 gold. All rights reserved.
//

import UIKit

class VisitedCell : UITableViewCell {

    @IBOutlet weak var mainView: UIView!
    
    @IBOutlet weak var logoImgView: UIImageView!
    @IBOutlet weak var nameLabel: UILabel!
    @IBOutlet weak var typeLabel: UILabel!
    
    @IBOutlet weak var infoLabel: UILabel!
    @IBOutlet weak var showButton: UIButton!
    
    var location: Location! {
        didSet {
            if let nameStr = location.name {
                nameLabel.text = nameStr.uppercased()
            }
            
            if let typeArray = location.cuisineTypes  {
                typeLabel.text = typeArray.joined(separator: " | ").uppercased()
            }
            
            infoLabel.text = "xxxx - xxxx"
            
            if let logoStr = location.logoURL {
                logoImgView.image = UIImage(named: logoStr)
            }
        }
    }
    
    override func awakeFromNib() {
        super.awakeFromNib()
        // Initialization code
    }

    class func reuseIdentifier() -> String {
        return "VisitedCell"
    }
    
    override func prepareForReuse() {
        super.prepareForReuse()
        
        logoImgView.image = nil
        nameLabel.text = ""
        typeLabel.text = ""
        infoLabel.text = ""
    }
    
    override func layoutIfNeeded() {
        super.layoutIfNeeded()
        

        makeRound(mainView, borderWidth: 1, borderColor: UIColor.light1, shadow: true)
        makeRound(logoImgView)
        makeRound(showButton, borderWidth: 2, borderColor: UIColor.orange1)
    }

}
