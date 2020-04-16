import {IsNotEmpty} from 'class-validator';
export class CreateEventDto {

    @IsNotEmpty()
    event_title:string;

    
    location:string;

    @IsNotEmpty()
    starts:string;


    @IsNotEmpty()
    ends:string;


    @IsNotEmpty()
    event_description:string;

    @IsNotEmpty()
    event_type:string;

    @IsNotEmpty()
    event_topic: string;

    @IsNotEmpty()
    event_image:string;
}