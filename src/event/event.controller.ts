import { Controller, Body, UsePipes, ValidationPipe, Post, Get, Patch, Param, ParseIntPipe, Delete, UseGuards } from '@nestjs/common';
import { CreateEventDto } from 'src/auth/dto/create-event.dto';
import { EventService } from './event.service';
import {Event} from 'src/event/event.entity';
import {GetEventsDto} from 'src/auth/dto/get-event.dto';
import { Individuals } from 'src/auth/user.entity';
import { GetUser } from 'src/auth/get-user-decorator';
import { AuthGuard } from '@nestjs/passport';


@Controller('event')
@UseGuards(AuthGuard())
export class EventController {
    constructor(
        private eventService : EventService,
    ){}
// Creer un evenement 
    @Post('/createEvent')
    @UsePipes(ValidationPipe)
    createEvent(
      @Body() createEventDto: CreateEventDto,
      @GetUser()individual: Individuals
      ): Promise<Event> {
        return this.eventService.createEvent(createEventDto,individual);
      }
//Lister l'nsemble des evenements 
      @Get('/getEvents')
      getEvents(
        @Body() getEventsDto : GetEventsDto,
        @GetUser() individual : Individuals,
        ) : Promise <Event [] > {
          return this.eventService.getEvent(getEventsDto,individual);
      }
// Chercher un evenment en se basant sur L'id 
      @Get('/:id')
      getEventById(
        @Param('id', ParseIntPipe) id: number,
        @GetUser() individual : Individuals): Promise<Event> {
        return this.eventService.getEventById(id, individual);
      }
    
// Modifier un evenement selon l'id  selectionner 
      @Patch('/:id')
      updateEvents(
        @Param('id', ParseIntPipe) id: number,
        @Body()  event_title, location, starts,ends,event_description,event_type,event_topic, event_image: CreateEventDto,
        @GetUser() individual : Individuals,
      ):  Promise<Event> {
        return this.eventService.updateEvents(id,event_title, location, starts,ends,event_description,event_type,event_topic, event_image,individual);
      }
// Supprimer un evenement en se basant sur la l'id  
      @Delete('/:id')
    deleteTask(
      @Param('id', ParseIntPipe) id: number,
      @GetUser() individual : Individuals): Promise<void> {
      return this.eventService.deleteEvent(id,individual);
    }


}
