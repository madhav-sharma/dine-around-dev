//
//  PurchaseVC.swift
//  DineAround
//
//  Created by Gold_Mac on 5/31/17.
//  Copyright © 2017 gold. All rights reserved.
//

import UIKit

class PurchaseVC: UIViewController {
    
    @IBOutlet weak var purchaseButton: UIButton!
    
    override func viewDidLoad() {
        super.viewDidLoad()
    }
    
    override func viewDidLayoutSubviews() {
        purchaseButton.makeRound()
    }
    
    @IBAction func actionPurchase(_ sender: Any) {
        self.navigationController?.popViewController(animated: true)
    }
}
