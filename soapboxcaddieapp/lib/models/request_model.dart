class RequestModel {
  final String id;
  final String userId;
  final String description;
  final String status;
  final DateTime createdAt;

  RequestModel({
    required this.id,
    required this.userId,
    required this.description,
    required this.status,
    required this.createdAt,
  });

  Map<String, dynamic> toMap() {
    return {
      'id': id,
      'userId': userId,
      'description': description,
      'status': status,
      'createdAt': createdAt.toIso8601String(),
    };
  }

  factory RequestModel.fromMap(Map<String, dynamic> map) {
    return RequestModel(
      id: map['id'],
      userId: map['userId'],
      description: map['description'],
      status: map['status'],
      createdAt: DateTime.parse(map['createdAt']),
    );
  }
}
