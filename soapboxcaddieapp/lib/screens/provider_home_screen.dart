import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:laundry_service_app/services/storage_service.dart';

class ProviderHomeScreen extends StatelessWidget {
  void _updateStatus(BuildContext context, String requestId, String status) {
    final storageService = Provider.of<StorageService>(context, listen: false);
    storageService.updateRequestStatus(requestId, status);
  }

  @override
  Widget build(BuildContext context) {
    final storageService = Provider.of<StorageService>(context);

    return Scaffold(
      appBar: AppBar(
        title: Text('Provider Dashboard'),
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
      body: ListView.builder(
        itemCount: storageService.requests
            .where((req) => req.status != 'Completed')
            .length,
        itemBuilder: (context, index) {
          final request = storageService.requests
              .where((req) => req.status != 'Completed')
              .toList()[index];
          return ListTile(
            title: Text(request.description),
            subtitle: Text('Status: ${request.status}'),
            trailing: request.status == 'Pending'
                ? ElevatedButton(
                    onPressed: () =>
                        _updateStatus(context, request.id, 'Accepted'),
                    child: Text('Accept'),
                  )
                : request.status == 'Accepted'
                    ? ElevatedButton(
                        onPressed: () =>
                            _updateStatus(context, request.id, 'In Progress'),
                        child: Text('Start'),
                      )
                    : request.status == 'In Progress'
                        ? ElevatedButton(
                            onPressed: () =>
                                _updateStatus(context, request.id, 'Completed'),
                            child: Text('Complete'),
                          )
                        : null,
          );
        },
      ),
    );
  }
}
