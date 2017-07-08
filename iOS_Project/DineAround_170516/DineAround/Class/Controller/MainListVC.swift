//
//  MainListVC.swift
//  DineAround
//
//  Created by Gold_Mac on 5/6/17.
//  Copyright © 2017 gold. All rights reserved.
//

import UIKit

class MainListVC: UIViewController {
    
    @IBOutlet weak var categoryView: UIView!
    @IBOutlet weak var tableView: UITableView!
    
    @IBOutlet weak var cuisineScrollView: UIScrollView!
    
    @IBOutlet weak var searchBar: UISearchBar!
    
    var selectedType = 1
    
    var locations: [Location] = []
    
    //
    @IBOutlet weak var filterView: UIView!
    
    @IBOutlet weak var visitedImgView: UIImageView!
    @IBOutlet weak var neverBeenImgView: UIImageView!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        self.testLocation()
        
        self.createCuisineButton()
        
        self.initFilterScreen()
        
        searchBar.isHidden = true
        
    }
    
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        
        if segue.identifier == "showDetail" {
            if let loc = sender as? Location,
                let detailVC = segue.destination as? DetailVC {
                
                detailVC.restaurant = loc
            }
        }
    }
    
    func testLocation() {
        
        let dictArray: [[String:Any?]] = [
            ["id": "1", "name": "the oxford", "address": "Venue St. 29, Ann Arbor", "cuisine_types": [["name": "Chinese"]], "logo": "res1", "photos":[["url": "res_info1"], ["url": "res_info2"], ["url": "res_info3"], ["url": "res_info4"]]],
            ["id": "2", "name": "spice art", "address": "Spice St. 31, Ann Arbor", "cuisine_types": [["name": "Indian"]], "logo": "res2", "photos":[["url": "res_info3"], ["url": "res_info1"], ["url": "res_info4"], ["url": "res_info2"]]],
            ["id": "3", "name": "peumuht", "address": "Pensil Rd. 12, Ann Arbor", "cuisine_types": [["name": "Italian"]], "logo": "res3", "photos":[["url": "res_info4"], ["url": "res_info3"], ["url": "res_info2"], ["url": "res_info1"]]]
            ]
        locations = []
        
        for dict in dictArray {
            let location = Location(dictionary: dict as NSDictionary)
            locations.append(location)
        }
        
    }
    
    func createCuisineButton() {
        let cuisineTextArray = ["all", "american", "mexican", "chinese", "italian", "indian"]
        
        var x: CGFloat = 0
        var rect = CGRect(x: 0, y: 0, width: 120, height: 40)
        var tag = 1
        for titleStr in cuisineTextArray {
            
            rect.origin.x = x
            
            let button = UIButton(type: .custom)
            
            button.setTitle(titleStr.uppercased(), for: .normal)
            button.titleLabel?.font = UIFont(name: "Comfortaa-Bold", size: 16)
            
            button.setTitleColor(UIColor.black, for: .normal)
            button.setTitleColor(UIColor.orange1, for: .selected)
            
            button.frame = rect
            button.addTarget(self, action: #selector(self.actionCuisine(_:)), for: .touchUpInside)
            
            if tag == self.selectedType {
                button.isSelected = true
            }
            
            button.tag = tag
            
            cuisineScrollView.addSubview(button)
            
            x += 128
            tag += 1
        }
        
        cuisineScrollView.contentInset = UIEdgeInsets(top: 0, left: 0, bottom: 40, right: x)
        
    }
    
    // MARK: - Action
    
    @IBAction func actionCuisine(_ sender: UIButton) {
        if sender.tag == selectedType {
            return
        }
        if let oldButton = cuisineScrollView.viewWithTag(selectedType) as? UIButton {
            oldButton.isSelected = false
        }
        selectedType = sender.tag
        sender.isSelected = true
    }

    @IBAction func actionPrev(_ sender: UIButton) {
        
    }
    
    @IBAction func actionNext(_ sender: UIButton) {
    }
    
    @IBAction func actionFilter(_ sender: UIBarButtonItem) {
        
        if filterView.isHidden == true {
            
            sender.isEnabled = false
            var rect : CGRect = filterView.frame
            rect.origin.y = UIScreen.main.bounds.height
            filterView.frame = rect
            
            filterView.isHidden = false
            
            let y0 = UIScreen.main.bounds.height * 0.25 - 50
            
            UIView.animate(withDuration: 0.5, delay: 0.05, options: [.curveEaseOut], animations: {
            
                rect.origin.y = y0
                self.filterView.frame = rect
            }, completion: {_ in
               sender.isEnabled = true
            })
        }
    }
    
    @IBAction func actionSearch(_ sender: UIBarButtonItem) {
        searchBar.isHidden = !searchBar.isHidden
    }
    
    // MARK: - Filter Screen
    
    func initFilterScreen() {
        filterView.isHidden = true

        visitedImgView.isHidden = true
        neverBeenImgView.isHidden = true
    }
    
    @IBAction func actionFilterDone(_ sender: UIButton) {
        
        if filterView.isHidden == false {
            sender.isEnabled = false
            var rect : CGRect = filterView.frame
            
            let y0 = UIScreen.main.bounds.height
            
            UIView.animate(withDuration: 0.5, delay: 0.05, options: [.curveEaseOut], animations: {
                
                rect.origin.y = y0
                self.filterView.frame = rect
            }, completion: {_ in
                self.filterView.isHidden = true
                sender.isEnabled = true
            })
        }
        
    }
    
    @IBAction func actionFilterVisited(_ sender: UIButton) {
        visitedImgView.isHidden = false
        neverBeenImgView.isHidden = true
    }
    
    @IBAction func actionFilterNeverBeen(_ sender: UIButton) {
        visitedImgView.isHidden = true
        neverBeenImgView.isHidden = false
    }
    
    @IBAction func actionFilterFeatures(_ sender: CheckButton) {
        sender.isSelected = !sender.isSelected
    }
    
}

extension MainListVC: UITableViewDelegate {
    public func tableView(_ tableView: UITableView, heightForRowAt indexPath: IndexPath) -> CGFloat {
        return 122
    }
}

extension MainListVC: UITableViewDataSource {
    @available(iOS 2.0, *)
    public func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return locations.count
    }
    
    @available(iOS 2.0, *)
    public func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        
        let cell = tableView.dequeueReusableCell(withIdentifier: MainViewCell.reuseIdentifier(), for: indexPath) as! MainViewCell
        
        cell.tag = indexPath.row
        cell.location = locations[indexPath.row]
        cell.delegate = self
        
        return cell
    }
    
    
}

extension MainListVC: ViewCellDelegate {
    func openView(_ index: Int) {
        self.performSegue(withIdentifier: "showDetail", sender: locations[index])
    }
}
