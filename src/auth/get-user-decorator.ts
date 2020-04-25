import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import {  Individuals } from "./user.entity";

export const GetUser = createParamDecorator((data, ctx: ExecutionContext): Individuals => {
    const req = ctx.switchToHttp().getRequest();
    return req.user;
});