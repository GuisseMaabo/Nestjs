import { Repository, EntityRepository } from "typeorm";
import { CreateEventDto } from "src/auth/dto/create-event.dto";
import {Event} from  "src/event/event.entity";
import { GetEventsDto } from "src/auth/dto/get-event.dto";
import { Individuals } from "src/auth/user.entity";




@EntityRepository(Event)
export class EventRepository extends Repository <Event> {

    async createEvent(
      createEventDto: CreateEventDto,
      individual:Individuals,
      ): Promise<Event> { 

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
        event.individual = individual;

        await event.save();
        delete event.individual;
        return event;
      }

      async getEvent (
        listingEvents : GetEventsDto,
        individual : Individuals, ) : Promise<Event[]> {
       // const { event_title, location, starts,ends,event_description,event_type,event_topic,event_image} = listingEvents;
        const query = this.createQueryBuilder('event');

        query.where('event.individualId = :individualId', { individualId: individual.id });

        const events = await query.getMany();
        return events;

      }

}