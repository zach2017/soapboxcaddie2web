import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:laundry_service_app/services/storage_service.dart';

class AdminHomeScreen extends StatelessWidget {
  void _deleteUser(BuildContext context, String userId) {
    final storageService = Provider.of<StorageService>(context, listen: false);
    storageService.deleteUser(userId);
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(content: Text('User deleted')),
    );
  }

  @override
  Widget build(BuildContext context) {
    final storageService = Provider.of<StorageService>(context);

    return Scaffold(
      appBar: AppBar(
        title: Text('Admin Dashboard'),
        actions: [
          IconButton(
            icon: Icon(Icons.logout),
            onPressed: () {
              storageService.clearCurrentUser();
              Navigator.pushReplacementNamed(context, '/');
            },
          ),
        ],
      ),
      body: Padding(
        padding: EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              'All Requests',
              style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
            ),
            Expanded(
              child: ListView.builder(
                itemCount: storageService.requests.length,
                itemBuilder: (context, index) {
                  final request = storageService.requests[index];
                  return ListTile(
                    title: Text(request.description),
                    subtitle: Text(
                        'User ID: ${request.userId} | Status: ${request.status}'),
                  );
                },
              ),
            ),
            SizedBox(height: 20),
            Text(
              'Manage Users',
              style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
            ),
            Expanded(
              child: ListView.builder(
                itemCount: storageService.users
                    .where((user) => user.role != 'admin')
                    .length,
                itemBuilder: (context, index) {
                  final user = storageService.users
                      .where((user) => user.role != 'admin')
                      .toList()[index];
                  return ListTile(
                    title: Text(user.email),
                    subtitle: Text('Role: ${user.role}'),
                    trailing: IconButton(
                      icon: Icon(Icons.delete),
                      onPressed: () => _deleteUser(context, user.id),
                    ),
                  );
                },
              ),
            ),
          ],
        ),
      ),
    );
  }
}
