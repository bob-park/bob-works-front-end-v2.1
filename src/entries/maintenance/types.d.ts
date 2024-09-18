interface MaintenanceCustomerChatRoom {
  id: string;
  customerId: string;
  title: string;
  createdDate: Date;
  lastModifiedDate?: Date;
}

interface MaintenanceCustomerChat {
  id: string;
  room: MaintenanceCustomerChatRoom;
  writerId: number;
  contents: string;
  isRead: string;
  createdDate: Date;
  lastModifiedDate?: Date;
}
