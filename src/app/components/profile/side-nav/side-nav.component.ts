import { Component ,Input , OnChanges} from '@angular/core';
import { User } from 'src/app/core/Models/UserModel';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnChanges {
  @Input() UserData:User = new User("das", "UserName", "FirstName", "LastName", "Email", "Address", "PhoneNumber",  new Date())
  


  ngOnChanges(): void{

  } 
}
