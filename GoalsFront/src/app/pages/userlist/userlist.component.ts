import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.scss']
})
export class UserListComponent implements OnInit {
  allUsers: { name: string; born: number; gender: string; address: string }[] = [];
  filteredUsers: { name: string; born: number; gender: string; address: string }[] = [];

  searchTerm = '';
  genderFilter = 'all';
  addressFilter: string | null = null;

  currentPage = 1;
  itemsPerPage = 3;

  constructor(private userService: UserService,private toastr: ToastrService) {}

  ngOnInit(): void {
    this.applyFilters();
  }

  applyFilters(): void {
    this.filteredUsers = this.allUsers.filter(user => {
      const searchMatch = user.name.toLowerCase().includes(this.searchTerm.toLowerCase());
      const genderMatch = this.genderFilter === 'all' || user.gender === this.genderFilter;
      const addressMatch = !this.addressFilter || user.address.includes(this.addressFilter);
      return searchMatch && genderMatch && addressMatch;
    });

    this.currentPage = 1;
  }

  clearFilters(): void {
    this.searchTerm = '';
    this.genderFilter = 'all';
    this.addressFilter = null;
    this.applyFilters();
  }

  get paginatedUsers() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredUsers.slice(start, start + this.itemsPerPage);
  }

  get totalPages() {
    return Math.ceil(this.filteredUsers.length / this.itemsPerPage);
  }

  changePage(page: number) {
    this.currentPage = page;
  }




  testToastr() {
    this.toastr.success('Toastr çalışıyor!');
  }
}
