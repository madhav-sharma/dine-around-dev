//
//  SettingVC.swift
//  DineAround
//
//  Created by Gold_Mac on 5/6/17.
//  Copyright © 2017 gold. All rights reserved.
//

import UIKit

class SettingVC: UITableViewController {

    override func viewDidLoad() {
        super.viewDidLoad()
    }

    // Override to support conditional editing of the table view.
    override func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        if indexPath.section == 0 { // change password
            self.performSegue(withIdentifier: "showChangePassword", sender: self)
        }
        else if indexPath.section == 2 { // instructions
            self.performSegue(withIdentifier: "showInstruction", sender: self)
        }
        else {
            if indexPath.row == 0 { // change phone number
                self.performSegue(withIdentifier: "showChangePhone", sender: self)
            }
            else if indexPath.row == 1 { // purchase history
                self.performSegue(withIdentifier: "showPurchaseHistory", sender: self)
            }
            else { // request help
                self.performSegue(withIdentifier: "showRequestHelp", sender: self)
            }
        }
    }
    
}

