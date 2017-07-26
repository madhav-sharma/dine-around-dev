//
//  VerifyForgotVC.swift
//  DineAround
//
//  Created by Gold_Mac on 5/19/17.
//  Copyright © 2017 gold. All rights reserved.
//

import UIKit
import FirebaseAuth

class VerifyReconfirmLoginVC: UIViewController {

    @IBOutlet weak var phoneLabel: UILabel!
    @IBOutlet var codeFieldArray: [UITextField]!
    
    var phoneNumber: String! = ""
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        phoneLabel.text = ApiManager.shared.tempPhone
    }

    @IBAction func actionDone(_ sender: Any) {
        processVerify()
    }
    
    func processVerify() {
        for field in codeFieldArray {
            field.resignFirstResponder()
        }
        if let codeStr = getCodeString() {
            SwiftLoader.show(animated: true)
            ApiManager.shared.userLogin(code: codeStr, completion: { (error) in
                SwiftLoader.hide()
                if error != 0{
                    for field in self.codeFieldArray {
                        field.text = ""
                    }
                    self.showAlert(title: "", message: "An error occurred with the verification code entered")
                } else {
                    
                    Auth.auth().currentUser?.updatePassword(to: "testing", completion: { (error) in
                        print("Look at this error \(String(describing: error))")
                    })
                    self.navigationController!.popToRootViewController(animated: true)
                    
                }

            })
        
        }
    }
    
    func getCodeString() -> String! {
        
        var codeStr: String! = ""
        
        for field in codeFieldArray {
            if field.text == "" {
                return nil
            }
            codeStr = codeStr + field.text!
        }
        
        return codeStr
    }
    
}

extension VerifyReconfirmLoginVC: UITextFieldDelegate {
    func textField(_ textField: UITextField, shouldChangeCharactersIn range: NSRange, replacementString string: String) -> Bool {
        // return true if the replacementString only contains numeric characters
        if string == "" {
            let tag = textField.tag
            DispatchQueue.main.async {
                if tag >= 2 {
                    self.codeFieldArray[tag-2].becomeFirstResponder()
                }
            }
            return true
        }
        if string.rangeOfCharacter(from: NSCharacterSet.decimalDigits) != nil {
            let nsString = NSString(string: textField.text!)
            let newText = nsString.replacingCharacters(in: range, with: string)
            let ret = newText.characters.count <= 1
            
            if newText.characters.count >= 1 {
                let tag = textField.tag
                DispatchQueue.main.async {
                    if tag == 6 {
                        self.processVerify()
                    }
                    else {
                        self.codeFieldArray[tag].becomeFirstResponder()
                    }
                }
            }
            return ret
        }
        
        return false
    }
    
    func textFieldDidEndEditing(_ textField: UITextField) {
        
    }
}

