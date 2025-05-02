import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:laundry_service_app/screens/login_screen.dart';
import 'package:laundry_service_app/screens/user_home_screen.dart';
import 'package:laundry_service_app/screens/provider_home_screen.dart';
import 'package:laundry_service_app/screens/admin_home_screen.dart';
import 'package:laundry_service_app/services/storage_service.dart';

void main() {
  runApp(LaundryServiceApp());
}

class LaundryServiceApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MultiProvider(
      providers: [
        ChangeNotifierProvider(create: (_) => StorageService()..initialize()),
      ],
      child: MaterialApp(
        title: 'Laundry Service App',
        theme: ThemeData(primarySwatch: Colors.blue),
        home: LoginScreen(),
        routes: {
          '/userHome': (context) => UserHomeScreen(),
          '/providerHome': (context) => ProviderHomeScreen(),
          '/adminHome': (context) => AdminHomeScreen(),
        },
      ),
    );
  }
}
