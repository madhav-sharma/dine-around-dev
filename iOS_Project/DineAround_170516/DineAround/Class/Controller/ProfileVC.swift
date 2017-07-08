//
//  ProfileVC.swift
//  DineAround
//
//  Created by Gold_Mac on 5/6/17.
//  Copyright © 2017 gold. All rights reserved.
//

import UIKit

class ProfileVC: UIViewController {

    @IBOutlet weak var profileView: UIView!
    @IBOutlet weak var nameLabel: UILabel!
    @IBOutlet weak var priceLabel: UILabel!
    @IBOutlet weak var phoneLabel: UILabel!
    @IBOutlet weak var sinceLabel: UILabel!
    
    @IBOutlet weak var tableView: UITableView!
    
    var selectedType = 1
    
    var locations: [Location] = []
    
    //
    @IBOutlet weak var registerView: UIView!
    @IBOutlet weak var tabView1: UIView!
    @IBOutlet weak var tabView2: UIView!
    
    @IBOutlet weak var loginPhoneButton: UIButton!
    @IBOutlet weak var signupPhoneButton: UIButton!
    
    var tabIndex = 1
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        self.testLocation()

        selectTab(index: 1)

    }
    
    override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(animated)
        
        profileView.isHidden = !UserInfo.shared.isLogin
        registerView.isHidden = UserInfo.shared.isLogin
        
        if UserInfo.shared.isLogin {
            nameLabel.text = UserInfo.shared.name
            phoneLabel.text = UserInfo.shared.phone
        }
    }
    
    override func viewDidLayoutSubviews() {
        loginPhoneButton.makeRound()
        signupPhoneButton.makeRound()
    }
    
    
    
    // MARK: -
    
    func testLocation() {
        
        let dictArray: [[String:Any?]] = [
            ["id": "1", "name": "the oxford", "address": "Venue St. 29, Ann Arbor", "cuisine_types": [["name": "Chinese"]], "logo": "res1", "photos":[["url": "res_info1"], ["url": "res_info2"], ["url": "res_info3"], ["url": "res_info4"]]],
            ["id": "2", "name": "spice art", "address": "Spice St. 31, Ann Arbor", "cuisine_types": [["name": "Indian"]], "logo": "res2", "photos":[["url": "res_info3"], ["url": "res_info1"], ["url": "res_info4"], ["url": "res_info2"]]],
            ["id": "3", "name": "peumuht", "address": "Pensil Rd. 12, Ann Arbor", "cuisine_types": [["name": "Italian"]], "logo": "res3", "photos":[["url": "res_info4"], ["url": "res_info3"], ["url": "res_info1"], ["url": "res_info1"]]]
        ]
        
        locations = []
        
        for dict in dictArray {
            let location = Location(dictionary: dict as NSDictionary)
            locations.append(location)
        }
        
    }
    
    // MARK: - Register View
    
    
    @IBAction func actionSelectTab(_ sender: UIButton) {
        if sender.tag == 20 { // signup
            if tabIndex == 1 {
                tabIndex = 0
                selectTab(index: 0)
            }
        }
        else {
            if tabIndex == 0 {
                tabIndex = 1
                selectTab(index: 1)
            }
        }
    }
    
    @IBAction func actionSignup(_ sender: UIButton) {
        self.performSegue(withIdentifier: "showSignup", sender: self)
    }
    
    @IBAction func actionLogin(_ sender: UIButton) {
        self.performSegue(withIdentifier: "showLogin", sender: self)
    }
    
    
    // MARK: -
    
    func selectTab(index: Int) {
        
        let flag: Bool = (index == 0)
        
        tabView1.isHidden = !flag
        tabView2.isHidden = flag
        
        signupPhoneButton.isHidden = !flag
        loginPhoneButton.isHidden = flag
    }
}



extension ProfileVC: UITableViewDelegate {
    public func tableView(_ tableView: UITableView, heightForRowAt indexPath: IndexPath) -> CGFloat {
        return 122
    }
}

extension ProfileVC: UITableViewDataSource {
    @available(iOS 2.0, *)
    public func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return locations.count
    }
    
    @available(iOS 2.0, *)
    public func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        
        let cell = tableView.dequeueReusableCell(withIdentifier: VisitedCell.reuseIdentifier(), for: indexPath) as! VisitedCell
        
        cell.location = locations[indexPath.row]
        
        return cell
    }
    
    
}

