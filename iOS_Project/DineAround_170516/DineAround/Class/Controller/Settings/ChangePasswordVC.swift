//
//  ChangePasswordVC.swift
//  DineAround
//
//  Created by Gold_Mac on 5/10/17.
//  Copyright © 2017 gold. All rights reserved.
//

import UIKit

class ChangePasswordVC: UIViewController {

    @IBOutlet weak var oldPassField: UITextField!
    @IBOutlet weak var newPassField: UITextField!
    @IBOutlet weak var confirmField: UITextField!
    
    @IBOutlet weak var changeButton: UIButton!
    
    
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view, typically from a nib.
    }
    
    override func viewDidLayoutSubviews() {
        changeButton.makeRound()
    }
    
    
    @IBAction func actionChange(_ sender: UIButton) {
        self.navigationController!.popViewController(animated: true)
    }
}

