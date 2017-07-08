//
//  DetailVC.swift
//  DineAround
//
//  Created by Gold_Mac on 5/11/17.
//  Copyright © 2017 gold. All rights reserved.
//

import UIKit
import MapKit

class DetailVC: UIViewController {

    @IBOutlet weak var offerButton: UIButton!
    @IBOutlet weak var detailButton: UIButton!
    
    // MARK: - Offer View
    @IBOutlet weak var offerView: UIView!
    @IBOutlet weak var offerImageScrollView: UIScrollView!
    
    @IBOutlet weak var offerPageCtrl: UIPageControl!
    
    
    @IBOutlet weak var cuisineLabel: UILabel!
    @IBOutlet weak var distanceLabel: UILabel!
    
    @IBOutlet weak var cityLabel: UILabel!
    @IBOutlet weak var infoLabel: UILabel!
    
    @IBOutlet weak var entry1Button: UIButton!
    @IBOutlet weak var entry2Button: UIButton!
    
    // MARK: - Detail View
    @IBOutlet weak var detailScrollView: UIScrollView!
    
    @IBOutlet weak var detailImageScrollView: UIScrollView!
    @IBOutlet weak var detailPageCtrl: UIPageControl!
    
    @IBOutlet weak var detailPhoneButton: UIButton!
    @IBOutlet weak var detailMenuButton: UIButton!
    @IBOutlet weak var detailWebsiteButton: UIButton!
    
    @IBOutlet weak var detailOpenTimeLabel: UILabel!
    
    @IBOutlet weak var detailReviewView: UIView!
    
    @IBOutlet weak var featureButtonScrollView: UIScrollView!
    
    @IBOutlet weak var detailMapView: MKMapView!
    // other
    
    private var offerScrollingTimer: Timer? {
        didSet {
            oldValue?.invalidate()
        }
    }
    
    private var detailScrollingTimer: Timer? {
        didSet {
            oldValue?.invalidate()
        }
    }
    
    var restaurant: Location!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        self.title = restaurant.name?.uppercased()
        self.navigationController?.navigationBar.backItem?.title = " "

        self.offerInit()
        
        self.detailInit()
    }
    
    override func viewDidLayoutSubviews() {
        super.viewDidLayoutSubviews()
        let height = 580 + UIScreen.main.bounds.width * 0.5
        self.detailScrollView.contentSize = CGSize(width: 0, height: height)
        
        print("detailview = \(self.detailImageScrollView.bounds)")
    }
    
    override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(animated)
    
        self.offerInitScrollTimer()
        self.detailInitScrollTimer()
    }
    
    override func viewWillDisappear(_ animated: Bool) {
        super.viewWillDisappear(animated)

        offerScrollingTimer?.invalidate()
        detailScrollingTimer?.invalidate()
    }

    // MARK: - OfferView Action
    
    @IBAction func actionSelect(_ sender: UIButton) {
        self.selectView(sender.tag - 1)
    }
    
    @IBAction  func actionEntry(_ sender: UIButton) {
        sender.isEnabled = !sender.isEnabled
        sender.isSelected = false
        
    }
    
    @IBAction func actionLocation(_ sender: UIButton) {
        print("open map")
    }

    
    // select one of Offer and Detail
    
    func offerInit() {
        selectView(0)
        entry1Button.isSelected = true
        entry2Button.isSelected = true
        
        if let imageURLs = restaurant.imageURLs {
            offerPageCtrl.numberOfPages = imageURLs.count
            
            offerBuildLocationImages()
        }
    }
    
    
    func selectView(_ index: Int) {
        offerButton.isSelected = index == 0
        detailButton.isSelected = index != 0
        
        offerView.isHidden = index != 0
        detailScrollView.isHidden = index == 0
    }
    
    func setReeemed(_ button: UIButton) {
        button.isEnabled = false
    }
    
    
    private func offerBuildLocationImages() {
        if let urlArray = self.restaurant.imageURLs {
            
            var xCoord: CGFloat = 0
            
            var imageFrame = CGRect(x: xCoord, y: 0,
                                    width: UIScreen.main.bounds.width,
                                    height: UIScreen.main.bounds.width*0.6)
            
            for url in urlArray {
                imageFrame.origin.x = xCoord
                let imgView = UIImageView(frame: imageFrame)
                imgView.contentMode = .scaleAspectFill
                
                imgView.image = UIImage(named: url)
                
                self.offerImageScrollView.addSubview(imgView)
                
                xCoord += UIScreen.main.bounds.width
            }
            
            self.offerImageScrollView.contentSize = CGSize(width: xCoord, height: 0)
        }
    }
    
    func offerInitScrollTimer() {
        offerScrollingTimer = Timer.scheduledTimer(timeInterval: 3, target: self, selector: #selector(offerScrollTimerFired), userInfo: nil, repeats: true)
    }
    
    func offerScrollTimerFired() {
        var scrollPage = self.offerPageCtrl.currentPage + 1
        
        var xCoord = CGFloat(scrollPage) * UIScreen.main.bounds.width
        
        if let imageCount = self.restaurant.imageURLs?.count {
            if scrollPage == imageCount {
                xCoord = 0
                scrollPage = 0
            }
        }
        let scrollPoint = CGPoint(x: xCoord, y: 0)
        
        self.offerImageScrollView.setContentOffset(scrollPoint, animated: true)
        
        self.offerPageCtrl.currentPage = scrollPage
        
    }
    
    // MARK: - DetailView Action
    
    @IBAction func actionDetailPhone(_ sender: UIButton) {
        print("call phone")
    }

    @IBAction func actionDetailMenu(_ sender: UIButton) {
        print("open coupon")
    }
    
    @IBAction func actionDetailWebsite(_ sender: UIButton) {
        print("open website")
    }
    
    
    // MARK: - DetailView method
    func detailInit() {
        
        makeRound(detailPhoneButton)
        makeRound(detailMenuButton)
        makeRound(detailWebsiteButton)
        
        self.detailInitReview()
        
        self.detailInitFeatures()
        
        if let imageURLs = restaurant.imageURLs {
            self.detailPageCtrl.numberOfPages = imageURLs.count + 1
        }
        else {
            self.detailPageCtrl.numberOfPages = 1
        }
        self.detailBuildLocationImages()
        
        let coord = CLLocationCoordinate2DMake(42.277110, -83.746275)
        let viewRegion = MKCoordinateRegionMakeWithDistance(coord, 200, 200)
        self.detailMapView.setRegion(viewRegion, animated: false)
    }
    
    
    
    func detailInitReview() {
        
        var rect = CGRect(x: 140, y: 11, width: 20, height: 20)
        
        for i in 0..<5 {
            
            let img = UIImage(named: i > 3 ? "im_star0" : "im_star")
            let imgView = UIImageView(image: img)
            imgView.frame = rect
            
            self.detailReviewView.addSubview(imgView)
            
            rect.origin.x = rect.origin.x + 20
        }
        
    }
    
    func detailInitFeatures() {
        let imgArray = ["bt_booze", "bt_creditcard", "bt_freewifi", "bt_reserve", "bt_wheelchair", "bt_outside"]
        
        var x: CGFloat = 8
        
        x = (UIScreen.main.bounds.width - 48 * 6 - 8 * 7) * 0.5
        if x < 8 {
            x = 8
        }
        
        var rect = CGRect(x: 8, y: 6, width: 48, height: 48)
        var tag = 21
        for img in imgArray {
            
            rect.origin.x = x
            
            let imgView = UIImageView(frame: rect)
            imgView.image = UIImage(named: img)
            imgView.backgroundColor = UIColor.white
            imgView.contentMode = .center
            
            imgView.layer.cornerRadius = 8
            imgView.layer.borderWidth = 0.5
            imgView.layer.borderColor = UIColor(white: 235/255.0, alpha: 1.0).cgColor
            
            if tag > 23 {
                imgView.alpha = 0.3
            }
            
            imgView.tag = tag
            
            self.featureButtonScrollView.addSubview(imgView)
            
            x += 48 + 8
            tag += 1
        }
        
        featureButtonScrollView.contentInset = UIEdgeInsets(top: 0, left: 0, bottom: 0, right: x)
    }
    
    private func detailBuildLocationImages() {
        
        var xCoord: CGFloat = 0
        
        let winSize = UIScreen.main.bounds.size

        var imageFrame = CGRect(x: xCoord, y: 0,
                                width: winSize.width,
                                height: CGFloat( Int(winSize.width*0.6 + 0.5) ))
        
        // Add Logo Info
        
        let logoView = UIView(frame: imageFrame)
        
        // add BlurImageView
        let blurImgView = UIImageView(image: UIImage(named: "res_info4"))
        blurImgView.frame = imageFrame
        blurImgView.contentMode = .scaleToFill
        logoView.addSubview(blurImgView)
        
        let blackView = UIView(frame: imageFrame)
        blackView.backgroundColor = UIColor.black
        blackView.alpha = 0.8
        logoView.addSubview(blackView)
        
        
        // add LogoView
        
        if let logoUrl = restaurant.logoURL {
            let logoImgView = UIImageView(image: UIImage(named: logoUrl))
            let rect = CGRect(x: winSize.width * 0.1, y: imageFrame.size.height * 0.5 - 40, width: 80, height: 80)
            logoImgView.frame = rect
            logoImgView.contentMode = .scaleAspectFit
            logoView.addSubview(logoImgView)
            
            makeRound(logoImgView)
        }
        
        var rect1 = CGRect(x: winSize.width * 0.35,
                           y: imageFrame.size.height * 0.5 - 40,
                           width: winSize.width * 0.5, height: 24)
        
        let locNameLabel = UILabel(frame: rect1)
        locNameLabel.text = restaurant.name?.uppercased()
        locNameLabel.textColor = UIColor.orange1
        locNameLabel.font = UIFont(name: "Comfortaa-Bold", size: 20)!
        
        logoView.addSubview(locNameLabel)
        
        
        rect1.origin.y = imageFrame.size.height * 0.5 - 10
        let locAddrLabel = UILabel(frame: rect1)
        locAddrLabel.text = restaurant.address?.uppercased()
        locAddrLabel.textColor = UIColor.white
        locAddrLabel.minimumScaleFactor = 0.8
        locAddrLabel.font = UIFont(name: "Comfortaa-Bold", size: 13)!
        
        logoView.addSubview(locAddrLabel)
        
        rect1.origin.y = imageFrame.size.height * 0.5 + 16
        let locCityLabel = UILabel(frame: rect1)
        locCityLabel.text = restaurant.cityStateString()
        locCityLabel.textColor = UIColor.white
        locCityLabel.font = UIFont(name: "Comfortaa-Bold", size: 13)!
        
        logoView.addSubview(locCityLabel)
        
        
        rect1.origin.y = imageFrame.size.height * 0.5 + 40
        let locCuisineLabel = UILabel(frame: rect1)
        
        if let typeArray = restaurant.cuisineTypes  {
            locCuisineLabel.text = typeArray.joined(separator: " | ").uppercased()
        }
        
        locCuisineLabel.textColor = UIColor.white
        locCuisineLabel.font = UIFont(name: "Comfortaa-Bold", size: 14)!
        
        logoView.addSubview(locCuisineLabel)
        
        
        self.detailImageScrollView.addSubview(logoView)
        xCoord += UIScreen.main.bounds.width

        // Add Photo
        if let urlArray = self.restaurant.imageURLs {
            for url in urlArray {
                imageFrame.origin.x = xCoord
                let imgView = UIImageView(frame: imageFrame)
                imgView.contentMode = .scaleAspectFill
                
                imgView.image = UIImage(named: url)
                
                self.detailImageScrollView.addSubview(imgView)
                
                xCoord += winSize.width
            }
            
            self.detailImageScrollView.contentSize = CGSize(width: xCoord, height: 0)
            
        }
    }
    
    func detailInitScrollTimer() {
        detailScrollingTimer = Timer.scheduledTimer(timeInterval: 3, target: self, selector: #selector(detailScrollTimerFired), userInfo: nil, repeats: true)
    }
    
    func detailScrollTimerFired() {
        var scrollPage = self.detailPageCtrl.currentPage + 1
        
        var xCoord = CGFloat(scrollPage) * UIScreen.main.bounds.width
        
        var imgCount = self.restaurant.imageURLs?.count ?? 0
        imgCount = imgCount + 1
        if scrollPage == imgCount {
            xCoord = 0
            scrollPage = 0
        }
    
        let scrollPoint = CGPoint(x: xCoord, y: 0)
        
        self.detailImageScrollView.setContentOffset(scrollPoint, animated: true)
        
        self.detailPageCtrl.currentPage = scrollPage
        
    }

    
}

// MARK: - UIScrollView Delegate

extension DetailVC : UIScrollViewDelegate {
    func scrollViewDidScroll(_ scrollView: UIScrollView) {
        if scrollView.tag == 1 && scrollView.isDragging && scrollView.isDecelerating {
            let pageSize: CGFloat = scrollView.contentSize.width / CGFloat(self.offerPageCtrl.numberOfPages)
            let offset: Double = Double(scrollView.contentOffset.x) / Double(pageSize)
            
            let imageNumber: Int = lround(offset)
            
            self.offerPageCtrl.currentPage = imageNumber
            
            self.offerInitScrollTimer()
        }
        else if scrollView.tag == 3 && scrollView.isDragging && scrollView.isDecelerating {
            let pageSize: CGFloat = scrollView.contentSize.width / CGFloat(self.detailPageCtrl.numberOfPages)
            let offset: Double = Double(scrollView.contentOffset.x) / Double(pageSize)
            
            let imageNumber: Int = lround(offset)
            
            self.detailPageCtrl.currentPage = imageNumber
            
            self.detailInitScrollTimer()
        }
    }
}
