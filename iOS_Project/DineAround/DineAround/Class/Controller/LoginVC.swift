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
    
    @IBOutlet weak var scrollView: UIScrollView!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view, typically from a nib.
        //phoneField.text = "123456789"
        //passwordField.text = "123456"
    }
    
    override func viewDidLayoutSubviews() {
        loginButton.makeRound()
        
        var edges = scrollView.contentInset
        edges.bottom = (self.view.frame.size.height-100) * (567-258) / 567
        scrollView.contentInset = edges
    }
    
    
    @IBAction func actionLogin(_ sender: UIButton) {
        if isValidItems() == true{
            UserInfo.shared.phone = phoneField.text!
            let errorVerif = ApiManager.shared.verifyPhoneFirebase(phoneNumber: UserInfo.shared.phone).error
            if errorVerif == 1{
                self.showAlert(title: "", message: "An error occurred trying to log in")
            } else{
                self.performSegue(withIdentifier: "verifyLogin", sender: nil)
            }
        }
    }
    
    @IBAction func actionReset(_ sender: UIButton) {
        self.performSegue(withIdentifier: "showForgot", sender: self)
    }

    
    
    func isValidItems() -> Bool {
        var valid = true
        if (phoneField.text == "") {
            self.showAlert(title: "", message: "Please input phone number", withField: phoneField)
           valid = false
        }
        
        return valid
    }
}


extension LoginVC: UITextFieldDelegate {
    func textFieldShouldReturn(_ textField: UITextField) -> Bool {
        textField.resignFirstResponder()
        
        return true
    }
}



