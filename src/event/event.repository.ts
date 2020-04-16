import { Repository, EntityRepository } from "typeorm";
import { CreateEventDto } from "src/auth/dto/create-event.dto";
import {Event} from  "src/event/event.entity";
import { GetEventsDto } from "src/auth/dto/get-event.dto";



@EntityRepository(Event)
export class EventRepository extends Repository <Event> {

    async createEvent(createEventDto: CreateEventDto): Promise<Event> { 

        const { event_title, location, starts,ends,event_description,event_type,event_topic, event_image } =  createEventDto;

        const event = new Event();
       
        event.event_title = event_title ;
        event.location = location;
        event.starts = starts;
        event.ends = ends;
        event.event_description = event_description;
        event.event_topic = event_topic;
        event.event_type = event_type ;
        event.event_image =  event_image;

        await event.save();
        
    
        return event;
      }

      async getEvent (listingEvents : GetEventsDto ) : Promise<Event[]> {
       // const { event_title, location, starts,ends,event_description,event_type,event_topic,event_image} = listingEvents;
        const query = this.createQueryBuilder('event');

        const events = await query.getMany();
        return events;

      }

}