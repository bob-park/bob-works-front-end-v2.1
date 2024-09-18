interface MaintenanceCustomerChatRoom {
  id: string;
  customerId: string;
  customer?: {
    id: number;
    userId: string;
    name: string;
  };
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
