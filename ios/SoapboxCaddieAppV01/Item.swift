//
//  Item.swift
//  SoapboxCaddieAppV01
//
//  Created by Zachary Lewis on 5/18/25.
//

import Foundation
import SwiftData

@Model
final class Item {
    var timestamp: Date
    
    init(timestamp: Date) {
        self.timestamp = timestamp
    }
}
