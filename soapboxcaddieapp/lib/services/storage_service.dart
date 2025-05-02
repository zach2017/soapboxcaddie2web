import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:laundry_service_app/models/user_model.dart';
import 'package:laundry_service_app/models/request_model.dart';

class StorageService with ChangeNotifier {
  List<UserModel> _users = [];
  List<RequestModel> _requests = [];
  UserModel? _currentUser;

  List<UserModel> get users => _users;
  List<RequestModel> get requests => _requests;
  UserModel? get currentUser => _currentUser;

  StorageService() {
    _initializeDemoData();
  }

  Future<void> initialize() async {
    await _loadData();
    notifyListeners();
  }

  void _initializeDemoData() {
    _users = [
      UserModel(
          id: '1',
          email: 'user1@example.com',
          password: 'password1',
          role: 'user'),
      UserModel(
          id: '2',
          email: 'user2@example.com',
          password: 'password2',
          role: 'user'),
      UserModel(
          id: '3',
          email: 'provider1@example.com',
          password: 'password3',
          role: 'provider'),
      UserModel(
          id: '4',
          email: 'provider2@example.com',
          password: 'password4',
          role: 'provider'),
      UserModel(
          id: '5',
          email: 'admin@example.com',
          password: 'adminpass',
          role: 'admin'),
    ];
    _saveUsers();
  }

  Future<void> _loadData() async {
    final prefs = await SharedPreferences.getInstance();
    final usersJson = prefs.getString('users');
    final requestsJson = prefs.getString('requests');
    final currentUserJson = prefs.getString('currentUser');

    if (usersJson != null) {
      _users = (jsonDecode(usersJson) as List)
          .map((item) => UserModel.fromMap(item))
          .toList();
    }
    if (requestsJson != null) {
      _requests = (jsonDecode(requestsJson) as List)
          .map((item) => RequestModel.fromMap(item))
          .toList();
    }
    if (currentUserJson != null) {
      _currentUser = UserModel.fromMap(jsonDecode(currentUserJson));
    }
  }

  Future<void> _saveUsers() async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString(
        'users', jsonEncode(_users.map((user) => user.toMap()).toList()));
    notifyListeners();
  }

  Future<void> _saveRequests() async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString(
        'requests', jsonEncode(_requests.map((req) => req.toMap()).toList()));
    notifyListeners();
  }

  Future<void> _saveCurrentUser() async {
    final prefs = await SharedPreferences.getInstance();
    if (_currentUser != null) {
      await prefs.setString('currentUser', jsonEncode(_currentUser!.toMap()));
    } else {
      await prefs.remove('currentUser');
    }
    notifyListeners();
  }

  void setCurrentUser(UserModel user) {
    _currentUser = user;
    _saveCurrentUser();
  }

  void clearCurrentUser() {
    _currentUser = null;
    _saveCurrentUser();
  }

  void addRequest(RequestModel request) {
    _requests.add(request);
    _saveRequests();
  }

  void updateRequestStatus(String requestId, String status) {
    final index = _requests.indexWhere((req) => req.id == requestId);
    if (index != -1) {
      _requests[index] = RequestModel(
        id: _requests[index].id,
        userId: _requests[index].userId,
        description: _requests[index].description,
        status: status,
        createdAt: _requests[index].createdAt,
      );
      _saveRequests();
    }
  }

  void deleteUser(String userId) {
    _users.removeWhere((user) => user.id == userId);
    _requests.removeWhere((req) => req.userId == userId);
    _saveUsers();
    _saveRequests();
  }
}
