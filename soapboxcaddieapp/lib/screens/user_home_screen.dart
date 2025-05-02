import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:laundry_service_app/models/request_model.dart';
import 'package:laundry_service_app/services/storage_service.dart';

class UserHomeScreen extends StatefulWidget {
  @override
  _UserHomeScreenState createState() => _UserHomeScreenState();
}

class _UserHomeScreenState extends State<UserHomeScreen> {
  final _descriptionController = TextEditingController();

  void _createRequest(BuildContext context) {
    final storageService = Provider.of<StorageService>(context, listen: false);
    final currentUser = storageService.currentUser;
    if (currentUser == null) return;

    final request = RequestModel(
      id: DateTime.now().millisecondsSinceEpoch.toString(),
      userId: currentUser.id,
      description: _descriptionController.text,
      status: 'Pending',
      createdAt: DateTime.now(),
    );

    storageService.addRequest(request);
    _descriptionController.clear();
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(content: Text('Request created')),
    );
  }

  @override
  Widget build(BuildContext context) {
    final storageService = Provider.of<StorageService>(context);
    final currentUser = storageService.currentUser;

    return Scaffold(
      appBar: AppBar(
        title: Text('User Dashboard'),
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
          children: [
            TextField(
              controller: _descriptionController,
              decoration: InputDecoration(labelText: 'Laundry Description'),
            ),
            SizedBox(height: 20),
            ElevatedButton(
              onPressed: () => _createRequest(context),
              child: Text('Request Laundry Service'),
            ),
            SizedBox(height: 20),
            Expanded(
              child: ListView.builder(
                itemCount: storageService.requests
                    .where((req) => req.userId == currentUser?.id)
                    .length,
                itemBuilder: (context, index) {
                  final request = storageService.requests
                      .where((req) => req.userId == currentUser?.id)
                      .toList()[index];
                  return ListTile(
                    title: Text(request.description),
                    subtitle: Text('Status: ${request.status}'),
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
