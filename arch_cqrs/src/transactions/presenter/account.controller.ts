import { Controller, Get, Param } from '@nestjs/common';
import { AccountService } from '../application/account.service';

@Controller('accounts')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.accountService.findOne(id);
  }
}
