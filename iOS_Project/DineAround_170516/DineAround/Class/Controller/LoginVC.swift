//
//  LoginVC.swift
//  DineAround
//
//  Created by Gold_Mac on 5/6/17.
//  Copyright © 2017 gold. All rights reserved.
//

import UIKit

class LoginVC: UIViewController {

    @IBOutlet weak var phoneField: UITextField!
    @IBOutlet weak var passwordField: UITextField!
    
    @IBOutlet weak var loginButton: UIButton!
    
    
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view, typically from a nib.
    }
    
    override func viewDidLayoutSubviews() {
        loginButton.makeRound()
    }
    
    
    @IBAction func actionLogin(_ sender: UIButton) {
        UserInfo.shared.isLogin = true
        UserInfo.shared.name = "Jone Doe"
        UserInfo.shared.phone = "+1 234 419 7890"
        self.navigationController!.popToRootViewController(animated: true)
    }
    
    
    @IBAction func actionReset(_ sender: UIButton) {
    }

}

