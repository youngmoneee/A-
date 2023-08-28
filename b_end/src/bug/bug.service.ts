import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class BugService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}
  async reportBug(reporter: string, title: string, body: string) {
    const githubApiUri = this.configService.get('GH_REPO_URI') + '/issues';
    const githubPersonalKey = this.configService.get('GH_PERSONAL_KEY');
    return await firstValueFrom(
      this.httpService.post(
        githubApiUri,
        {
          title: title,
          body: body + `\r\n\r\n Reporter : ${reporter}`,
          labels: ['bug'],
        },
        {
          headers: {
            Authorization: `Bearer ${githubPersonalKey}`,
            Accept: 'application/vnd.github.v3+json',
            'X-GitHub-Api-Version': '2022-11-28',
          },
        },
      ),
    );
  }
}
