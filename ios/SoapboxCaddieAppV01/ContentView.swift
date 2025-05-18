
import SwiftUI

// MARK: - Models

struct User: Identifiable, Codable, Equatable {
    var id = UUID()
    var username: String
    var role: String // admin, requester, provider
}

struct RegistrationData: Identifiable, Codable {
    var id = UUID()
    var name: String
    var email: String
    var cellPhone: String
    var role: String
}

struct LaundryRequest: Identifiable, Codable {
    var id = UUID()
    var customerName: String
    var pickupTime: String
    var address: String
}

struct ProviderProfile: Identifiable, Codable {
    var id = UUID()
    var providerName: String
    var availableDays: String
}

// MARK: - App State

class AppState: ObservableObject {
    @Published var user: User?
    @Published var showPopup: Bool = false
    @Published var popupJSON: String = ""
    @Published var registeredUsers: [User] = StaticAuthAPI.getExampleUsers()
}

// MARK: - Main View

struct ContentView: View {
    @StateObject private var appState = AppState()

    var body: some View {
        NavigationView {
            ZStack {
                LinearGradient(gradient: Gradient(colors: [Color("SoftBlue"), Color.white]), startPoint: .top, endPoint: .bottom)
                    .edgesIgnoringSafeArea(.all)

                if appState.user == nil {
                    LoginView().environmentObject(appState)
                } else {
                    MainMenuView().environmentObject(appState)
                }
            }
        }
        .alert(isPresented: $appState.showPopup) {
            Alert(
                title: Text("Submitted JSON"),
                message: Text(appState.popupJSON),
                dismissButton: .default(Text("OK"))
            )
        }
    }
}

// MARK: - Login View

struct LoginView: View {
    @EnvironmentObject var appState: AppState
    @State private var username = ""
    @State private var password = ""
    @State private var errorMessage = ""
    @State private var showingRegistration = false

    var body: some View {
        ZStack {
            Color("SoftBlue").opacity(0.1).edgesIgnoringSafeArea(.all)

            VStack(spacing: 20) {
                Image("soapboxlogo")
                    .resizable()
                    .scaledToFit()
                    .frame(width: 200, height: 200)
                    .foregroundColor(.blue)

                Text("Laundry App Login")
                    .font(.title)
                    .bold()

                TextField("Username", text: $username)
                    .textFieldStyle(RoundedBorderTextFieldStyle())
                    .autocapitalization(.none)
                    .padding(.horizontal)

                SecureField("Password", text: $password)
                    .textFieldStyle(RoundedBorderTextFieldStyle())
                    .padding(.horizontal)

                if !errorMessage.isEmpty {
                    Text(errorMessage)
                        .foregroundColor(.red)
                        .font(.footnote)
                }

                Button("Login") {
                    login()
                }
                .frame(maxWidth: .infinity)
                .padding()
                .background(Color.accentColor)
                .foregroundColor(.white)
                .clipShape(RoundedRectangle(cornerRadius: 12))
                .shadow(radius: 2)
                .padding(.horizontal)

                Button("Register") {
                    showingRegistration = true
                }
                .frame(maxWidth: .infinity)
                .padding()
                .background(Color.green)
                .foregroundColor(.white)
                .clipShape(RoundedRectangle(cornerRadius: 12))
                .shadow(radius: 2)
                .padding(.horizontal)
            }
            .padding(.top, 80)
        }
        .sheet(isPresented: $showingRegistration) {
            RegistrationView()
                .environmentObject(appState)
        }
    }

    func login() {
        if let matchedUser = appState.registeredUsers.first(where: { $0.username == username }) {
            if password == "password" {
                appState.user = matchedUser
                errorMessage = ""
            } else {
                errorMessage = "Incorrect password."
            }
        } else {
            errorMessage = "User not found."
        }
    }
}

// MARK: - Registration View

struct RegistrationView: View {
    @EnvironmentObject var appState: AppState
    @Environment(\.presentationMode) var presentationMode
    
    @State private var name = ""
    @State private var email = ""
    @State private var cellPhone = ""
    @State private var selectedRole = "requester"
    
    let roles = ["requester", "provider"]

    var body: some View {
        NavigationView {
            Form {
                Section(header: Text("Personal Information").fontWeight(.bold)) {
                    TextField("Full Name", text: $name)
                    TextField("Email", text: $email)
                        .keyboardType(.emailAddress)
                        .autocapitalization(.none)
                    TextField("Cell Phone", text: $cellPhone)
                        .keyboardType(.phonePad)
                }

                Section(header: Text("Role Selection").fontWeight(.bold)) {
                    Picker("Role", selection: $selectedRole) {
                        ForEach(roles, id: \.self) { role in
                            Text(role.capitalized).tag(role)
                        }
                    }
                    .pickerStyle(SegmentedPickerStyle())
                }

                Section {
                    Button("Submit Registration") {
                        submitRegistration()
                    }
                    .frame(maxWidth: .infinity, alignment: .center)
                    .padding()
                    .background(Color.blue)
                    .foregroundColor(.white)
                    .clipShape(RoundedRectangle(cornerRadius: 12))
                }
            }
            .navigationTitle("Register")
            .navigationBarItems(trailing: Button("Cancel") {
                presentationMode.wrappedValue.dismiss()
            })
        }
    }

    func submitRegistration() {
        let registrationData = RegistrationData(
            name: name,
            email: email,
            cellPhone: cellPhone,
            role: selectedRole
        )
        
        let json = StaticAuthAPI.submitRegistration(registrationData)
        appState.popupJSON = json
        appState.showPopup = true
        
        // Add the new user to registered users
        let newUser = User(username: email, role: selectedRole)
        appState.registeredUsers.append(newUser)
        
        presentationMode.wrappedValue.dismiss()
    }
}

// MARK: - Main Menu

struct MainMenuView: View {
    @EnvironmentObject var appState: AppState

    var body: some View {
        VStack(spacing: 30) {
            Image(systemName: "tshirt.fill")
                .resizable()
                .frame(width: 80, height: 80)
                .foregroundColor(.purple)
                .padding(.top, 30)

            Text("Welcome, \(appState.user?.username.capitalized ?? "")")
                .font(.largeTitle)
                .fontWeight(.semibold)

            MenuButton(title: "Request Laundry Service", destination: RequestServiceView())
            MenuButton(title: "Become a Provider", destination: BecomeProviderView())
            MenuButton(title: "View Request Status", destination: StatusView())
        }
        .padding()
        .background(
            RoundedRectangle(cornerRadius: 20)
                .fill(Color.white)
                .shadow(radius: 5)
        )
        .padding()
    }
}

struct MenuButton<Destination: View>: View {
    let title: String
    let destination: Destination

    var body: some View {
        NavigationLink(destination: destination) {
            Text(title)
                .frame(maxWidth: .infinity)
                .padding()
                .background(Color.accentColor)
                .foregroundColor(.white)
                .font(.headline)
                .clipShape(RoundedRectangle(cornerRadius: 12))
                .shadow(radius: 2)
        }
        .padding(.horizontal, 30)
    }
}

// MARK: - Request Service View

struct RequestServiceView: View {
    @EnvironmentObject var appState: AppState
    @State private var name = ""
    @State private var time = ""
    @State private var address = ""

    var body: some View {
        Form {
            Section(header: Text("Pickup Info").fontWeight(.bold)) {
                TextField("Your Name", text: $name)
                TextField("Pickup Time", text: $time)
                TextField("Address", text: $address)
            }

            Button("Submit Request") {
                let request = LaundryRequest(customerName: name, pickupTime: time, address: address)
                let json = StaticLaundryAPI.submitLaundryRequest(request)
                appState.popupJSON = json
                appState.showPopup = true
            }
            .frame(maxWidth: .infinity, alignment: .center)
            .padding()
            .background(Color.green)
            .foregroundColor(.white)
            .clipShape(RoundedRectangle(cornerRadius: 12))
        }
        .navigationTitle("Request Laundry")
    }
}

// MARK: - Become Provider View

struct BecomeProviderView: View {
    @EnvironmentObject var appState: AppState
    @State private var providerName = ""
    @State private var days = ""

    var body: some View {
        Form {
            Section(header: Text("Your Info").fontWeight(.bold)) {
                TextField("Provider Name", text: $providerName)
                TextField("Available Days", text: $days)
            }

            Button("Submit Profile") {
                let profile = ProviderProfile(providerName: providerName, availableDays: days)
                let json = StaticLaundryAPI.submitProviderProfile(profile)
                appState.popupJSON = json
                appState.showPopup = true
            }
            .frame(maxWidth: .infinity, alignment: .center)
            .padding()
            .background(Color.blue)
            .foregroundColor(.white)
            .clipShape(RoundedRectangle(cornerRadius: 12))
        }
        .navigationTitle("Become a Provider")
    }
}

// MARK: - Status View

struct StatusView: View {
    let requests = StaticLaundryAPI.getStaticRequests()

    var body: some View {
        List {
            ForEach(requests) { req in
                VStack(alignment: .leading, spacing: 4) {
                    Text("Customer: \(req.customerName)").fontWeight(.bold)
                    Text("Pickup Time: \(req.pickupTime)")
                    Text("Address: \(req.address)")
                }
                .padding(8)
                .background(Color("CardBackground"))
                .clipShape(RoundedRectangle(cornerRadius: 10))
                .shadow(radius: 1)
            }
        }
        .navigationTitle("Service Status")
    }
}

// MARK: - Static API

struct StaticAuthAPI {
    static func getExampleUsers() -> [User] {
        return [
            User(username: "admin", role: "admin"),
            User(username: "jane_requester", role: "requester"),
            User(username: "john_provider", role: "provider")
        ]
    }
    
    static func submitRegistration(_ registration: RegistrationData) -> String {
        encodeToJSON(registration)
    }
    
    static func encodeToJSON<T: Encodable>(_ value: T) -> String {
        let encoder = JSONEncoder()
        encoder.outputFormatting = .prettyPrinted
        guard let data = try? encoder.encode(value),
              let json = String(data: data, encoding: .utf8) else { return "{}" }
        return json
    }
}

struct StaticLaundryAPI {
    static func submitLaundryRequest(_ request: LaundryRequest) -> String {
        encodeToJSON(request)
    }

    static func submitProviderProfile(_ profile: ProviderProfile) -> String {
        encodeToJSON(profile)
    }

    static func getStaticRequests() -> [LaundryRequest] {
        [
            LaundryRequest(customerName: "Alice", pickupTime: "10:00 AM", address: "123 Main St"),
            LaundryRequest(customerName: "Bob", pickupTime: "2:00 PM", address: "456 Oak Dr")
        ]
    }

    static func encodeToJSON<T: Encodable>(_ value: T) -> String {
        let encoder = JSONEncoder()
        encoder.outputFormatting = .prettyPrinted
        guard let data = try? encoder.encode(value),
              let json = String(data: data, encoding: .utf8) else { return "{}" }
        return json
    }
}
