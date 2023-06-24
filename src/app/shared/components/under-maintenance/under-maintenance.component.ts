import { AfterViewInit, Component } from '@angular/core';

@Component({
  selector: 'app-under-maintenance',
  templateUrl: './under-maintenance.component.html',
  styleUrls: ['./under-maintenance.component.css']
})
  export class UnderMaintenanceComponent implements AfterViewInit {
    ngAfterViewInit(): void {
      setTimeout(() => {
        this.shownMessage = this.getRandomMessage();
      });
    }
    funnyMessages:string[] = [
      "🚧 Whoopsie-daisy! Our website is currently taking a little nap, but don't you worry, we're just fluffing its pixels and tickling its code! 🛌💤",
      "🔧 Hold on to your virtual hard hats! Our team of tech gnomes is busy polishing, tweaking, and fixing things up. They may be small, but boy, are they mighty! 💪🧙‍♂️",
      "⏰ We apologize for the temporary disruption in our cosmic internet equilibrium. Our servers are taking a quick interstellar coffee break, but they'll be back in the virtual grind soon! ☕️🚀",
      "🎶 Twinkle, twinkle, little website, how we wonder what's the fuss. But fret not, we're sprinkling some coding stardust to make it shiny and fabulous! ✨✨",
      "🌐 Uh-oh, it seems like our website caught a case of the virtual hiccups! Don't worry, though, we've got the cyber-doctor on call, and we'll have it hiccup-free in no time! 🎩🐇",
      "🔌 Hold on to your e-wires! Our website has gone on a brief vacation to reboot its creativity circuits. It's out soaking up inspiration at the digital beach, but it'll be back with a splash! 🏖️🌴",
      "🕒 Time for a digital siesta! Our website is taking a quick power nap to rejuvenate its pixels and bring you an even better online experience. Wake it up with some cyber-applause when it's back! 👏💤",
      "🚀 Our website has temporarily blasted off to explore the vast frontiers of cyberspace. It's boldly going where no webpage has gone before, but it'll return soon with a stellar update! 🌌👩‍🚀"
    ];
    shownMessage:string='';
    getRandomMessage(){
      return this.funnyMessages[Math.floor(Math.random() * this.funnyMessages.length)];
    }

  }
