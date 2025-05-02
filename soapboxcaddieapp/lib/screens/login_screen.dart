import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:laundry_service_app/models/user_model.dart';
import 'package:laundry_service_app/services/storage_service.dart';

class LoginScreen extends StatefulWidget {
  @override
  _LoginScreenState createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen>
    with SingleTickerProviderStateMixin {
  final _emailController = TextEditingController();
  final _passwordController = TextEditingController();
  bool _isLoading = false;
  int _selectedTabIndex = 0; // 0 for Laundry, 1 for Provider
  late TabController _tabController;
  bool _showLogoPopup = true; // Controls logo popup visibility

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: 2, vsync: this);
    _tabController.addListener(() {
      if (_tabController.index != _selectedTabIndex) {
        setState(() {
          _selectedTabIndex = _tabController.index;
        });
      }
    });
    // Trigger logo animation after 2 seconds
    Future.delayed(Duration(seconds: 2), () {
      if (mounted) {
        setState(() {
          _showLogoPopup = false;
        });
      }
    });
  }

  @override
  void dispose() {
    _tabController.dispose();
    _emailController.dispose();
    _passwordController.dispose();
    super.dispose();
  }

  void _login(BuildContext context) {
    setState(() => _isLoading = true);
    final storageService = Provider.of<StorageService>(context, listen: false);
    final user = storageService.users.firstWhere(
      (user) =>
          user.email == _emailController.text.trim() &&
          user.password == _passwordController.text.trim(),
      orElse: () => UserModel(id: '', email: '', password: '', role: 'user'),
    );

    if (user.id.isNotEmpty) {
      // Validate role based on selected tab
      if (_selectedTabIndex == 0 &&
          (user.role == 'user' || user.role == 'admin')) {
        storageService.setCurrentUser(user);
        Navigator.pushReplacementNamed(
            context, user.role == 'admin' ? '/adminHome' : '/userHome');
      } else if (_selectedTabIndex == 1 &&
          (user.role == 'provider' || user.role == 'admin')) {
        storageService.setCurrentUser(user);
        Navigator.pushReplacementNamed(
            context, user.role == 'admin' ? '/adminHome' : '/providerHome');
      } else {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Invalid role for this tab')),
        );
      }
    } else {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Invalid email or password')),
      );
    }
    setState(() => _isLoading = false);
  }

  @override
  Widget build(BuildContext context) {
    final screenWidth = MediaQuery.of(context).size.width;
    final isSmallScreen = screenWidth < 360; // Adjust for very small screens

    return Scaffold(
      body: Stack(
        children: [
          // Background logo (shown after animation)
          AnimatedOpacity(
            opacity: _showLogoPopup ? 0.0 : 0.2,
            duration: Duration(seconds: 1),
            child: Positioned.fill(
              child: Image.asset(
                'assets/logo.png',
                fit: BoxFit.cover,
              ),
            ),
          ),
          // Popup logo (shown on startup)
          if (_showLogoPopup)
            Center(
              child: AnimatedContainer(
                duration: Duration(seconds: 1),
                width: _showLogoPopup ? (isSmallScreen ? 200 : 300) : 0,
                height: _showLogoPopup ? (isSmallScreen ? 200 : 300) : 0,
                child: Image.asset(
                  'assets/logo.png',
                  fit: BoxFit.contain,
                ),
              ),
            ),
          // Main content (shown after logo animation)
          AnimatedOpacity(
            opacity: _showLogoPopup ? 0.0 : 1.0,
            duration: Duration(seconds: 1),
            child: SafeArea(
              child: Column(
                children: [
                  // Top tab bar with border
                  Container(
                    decoration: BoxDecoration(
                      color: Colors.blue[800],
                      border: Border.all(
                        color: Colors.white,
                        width: 2.0,
                      ),
                    ),
                    child: PreferredSize(
                      preferredSize: Size.fromHeight(isSmallScreen ? 40 : 48),
                      child: TabBar(
                        controller: _tabController,
                        indicatorColor: Colors.white,
                        labelColor: Colors.white,
                        unselectedLabelColor: Colors.white70,
                        labelStyle: TextStyle(
                          fontSize: isSmallScreen ? 14 : 16,
                        ),
                        padding: EdgeInsets.symmetric(horizontal: 8.0),
                        tabs: [
                          Tab(text: 'Laundry'),
                          Tab(text: 'Provider'),
                        ],
                      ),
                    ),
                  ),
                  // Login form
                  Expanded(
                    child: Center(
                      child: SingleChildScrollView(
                        padding: EdgeInsets.all(isSmallScreen ? 8.0 : 16.0),
                        child: Container(
                          padding: EdgeInsets.all(isSmallScreen ? 16.0 : 24.0),
                          decoration: BoxDecoration(
                            color: Colors.white.withOpacity(0.85),
                            borderRadius: BorderRadius.circular(12.0),
                            boxShadow: [
                              BoxShadow(
                                color: Colors.black26,
                                blurRadius: 10.0,
                                offset: Offset(0, 4),
                              ),
                            ],
                          ),
                          width: isSmallScreen ? screenWidth * 0.9 : 400,
                          child: Column(
                            mainAxisSize: MainAxisSize.min,
                            children: [
                              Text(
                                _selectedTabIndex == 0
                                    ? 'Laundry User Login'
                                    : 'Provider Login',
                                style: TextStyle(
                                  fontSize: isSmallScreen ? 20 : 24,
                                  fontWeight: FontWeight.bold,
                                  color: Colors.blue[800],
                                ),
                              ),
                              SizedBox(height: isSmallScreen ? 12 : 20),
                              TextField(
                                controller: _emailController,
                                decoration: InputDecoration(
                                  labelText: 'Email',
                                  border: OutlineInputBorder(
                                    borderRadius: BorderRadius.circular(8.0),
                                  ),
                                  filled: true,
                                  fillColor: Colors.grey[100],
                                  labelStyle: TextStyle(
                                    fontSize: isSmallScreen ? 14 : 16,
                                  ),
                                ),
                              ),
                              SizedBox(height: isSmallScreen ? 8 : 16),
                              TextField(
                                controller: _passwordController,
                                decoration: InputDecoration(
                                  labelText: 'Password',
                                  border: OutlineInputBorder(
                                    borderRadius: BorderRadius.circular(8.0),
                                  ),
                                  filled: true,
                                  fillColor: Colors.grey[100],
                                  labelStyle: TextStyle(
                                    fontSize: isSmallScreen ? 14 : 16,
                                  ),
                                ),
                                obscureText: true,
                              ),
                              SizedBox(height: isSmallScreen ? 16 : 24),
                              _isLoading
                                  ? CircularProgressIndicator()
                                  : ElevatedButton(
                                      onPressed: () => _login(context),
                                      style: ElevatedButton.styleFrom(
                                        backgroundColor: Colors.blue[800],
                                        padding: EdgeInsets.symmetric(
                                          horizontal: isSmallScreen ? 20 : 40,
                                          vertical: isSmallScreen ? 12 : 16,
                                        ),
                                        shape: RoundedRectangleBorder(
                                          borderRadius:
                                              BorderRadius.circular(8.0),
                                        ),
                                      ),
                                      child: Text(
                                        'Login',
                                        style: TextStyle(
                                          fontSize: isSmallScreen ? 14 : 16,
                                          color: Colors.white,
                                        ),
                                      ),
                                    ),
                            ],
                          ),
                        ),
                      ),
                    ),
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
      // Bottom navigation bar (shown after logo animation)
      bottomNavigationBar: AnimatedOpacity(
        opacity: _showLogoPopup ? 0.0 : 1.0,
        duration: Duration(seconds: 1),
        child: BottomNavigationBar(
          items: [
            BottomNavigationBarItem(
              icon: Icon(Icons.track_changes),
              label: 'Status',
            ),
            BottomNavigationBarItem(
              icon: Icon(Icons.account_circle),
              label: 'Account',
            ),
          ],
          selectedItemColor: Colors.blue[800],
          unselectedItemColor: Colors.grey,
          onTap: (index) {
            // Placeholder for future navigation
            ScaffoldMessenger.of(context).showSnackBar(
              SnackBar(
                  content: Text(
                      index == 0 ? 'Status screen TBD' : 'Account screen TBD')),
            );
          },
        ),
      ),
    );
  }
}
