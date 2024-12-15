import { Module } from '@nestjs/common';
import { LoginModule } from './login/login.module';
import { LogoutModule } from './logout/logout.module';
import { RegisterModule } from './register/register.module';

@Module({
  imports: [LoginModule, LogoutModule, RegisterModule],
})
export class AuthModule {}
