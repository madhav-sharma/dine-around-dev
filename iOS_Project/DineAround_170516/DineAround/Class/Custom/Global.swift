//
//  Global.swift
//  DineAround
//
//  Created by Gold_Mac on 5/11/17.
//  Copyright © 2017 gold. All rights reserved.
//

import UIKit
import MapKit

var g_currentLocation = CLLocationCoordinate2DMake(42.277110, -83.746275)

extension UIColor
{
    public class var orange1: UIColor
    {
        return UIColor(red:230/255.0, green:126/255.0, blue:37/255.0, alpha:1.0)
    }
    
    public class var light1: UIColor
    {
        return UIColor(red:224/255.0, green:224/255.0, blue:224/255.0, alpha:1.0)
    }
    
    public class var dark1: UIColor
    {
        return UIColor(red:68/255.0, green:68/255.0, blue:68/255.0, alpha:1.0)
    }
}

class UserInfo {
    
    public static var _shared: UserInfo! = nil
    
    public class var shared: UserInfo! {
        if _shared == nil {
            _shared = UserInfo()
        }
        return _shared
    }
    
    var name: String = ""
    var phone: String = ""
    var email: String = ""
    var password: String = ""
    var isLogin: Bool = false
}

func makeRound(_ view: UIView, borderWidth: CGFloat = 0, borderColor: UIColor = UIColor.orange1, shadow: Bool = false) {
    let layer = view.layer
    layer.cornerRadius = 0.5 * view.bounds.size.height
    if borderWidth > 0 {
        layer.borderColor = borderColor.cgColor
        layer.borderWidth = borderWidth
    }
    view.clipsToBounds = true
    
    if shadow == true {
        
        let shadowPath = UIBezierPath(roundedRect: view.bounds, cornerRadius: layer.cornerRadius)
        
        layer.masksToBounds = false
        layer.shadowColor = UIColor.darkGray.cgColor
        layer.shadowOffset = CGSize(width: 0, height: 0.5)
        layer.shadowOpacity = 0.3
        layer.shadowRadius = 3.0
        layer.shadowPath = shadowPath.cgPath
    }
}
