//
//  RequestHelpVC.swift
//  DineAround
//
//  Created by Gold_Mac on 5/10/17.
//  Copyright © 2017 gold. All rights reserved.
//

import UIKit

class RequestHelpVC: UIViewController {

    @IBOutlet weak var messageTextView: UITextView!
    
    @IBOutlet weak var submitButton: UIButton!
    
    
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view, typically from a nib.
    }
    
    override func viewDidLayoutSubviews() {
        submitButton.makeRound()
        
        messageTextView.layer.borderColor = UIColor.lightGray.cgColor
        messageTextView.layer.borderWidth = 0.5
        messageTextView.layer.cornerRadius = 3
        messageTextView.layer.masksToBounds = true
    }
    
    
    @IBAction func actionSend(_ sender: UIButton) {
        self.navigationController!.popViewController(animated: true)
    }
}

