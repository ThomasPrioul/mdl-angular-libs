import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { By } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { MdlBreadcrumbsComponent, NavItem } from './breadcrumbs.component';

describe('MdlBreadcrumbsComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MdlBreadcrumbsComponent],
      providers: [provideRouter([])],
    });
  });

  it('renders no buttons when items is undefined', () => {
    const fixture = TestBed.createComponent(MdlBreadcrumbsComponent);
    fixture.detectChanges();
    const buttons = fixture.debugElement.queryAll(By.css('button'));
    expect(buttons.length).toBe(0);
  });

  it('renders one button per item', () => {
    const fixture = TestBed.createComponent(MdlBreadcrumbsComponent<string>);
    const items: NavItem<string>[] = [
      { value: 'Home', url: '/' },
      { value: 'About', url: '/about' },
    ];
    fixture.componentRef.setInput('items', items);
    fixture.detectChanges();
    const buttons = fixture.debugElement.queryAll(By.css('button'));
    expect(buttons.length).toBe(2);
  });

  it('displays item values as button text', () => {
    const fixture = TestBed.createComponent(MdlBreadcrumbsComponent<string>);
    fixture.componentRef.setInput('items', [
      { value: 'Home', url: '/' },
      { value: 'Contact', url: '/contact' },
    ]);
    fixture.detectChanges();
    const buttons = fixture.debugElement.queryAll(By.css('button'));
    expect(buttons[0].nativeElement.textContent.trim()).toBe('Home');
    expect(buttons[1].nativeElement.textContent.trim()).toBe('Contact');
  });

  it('attaches routerLink directive to each button', () => {
    const fixture = TestBed.createComponent(MdlBreadcrumbsComponent<string>);
    fixture.componentRef.setInput('items', [
      { value: 'Home', url: '/' },
      { value: 'About', url: '/about' },
    ]);
    fixture.detectChanges();
    const links = fixture.debugElement.queryAll(By.directive(RouterLink));
    expect(links.length).toBe(2);
  });

  it('renders a chevron separator between items (not before first)', () => {
    const fixture = TestBed.createComponent(MdlBreadcrumbsComponent<string>);
    fixture.componentRef.setInput('items', [
      { value: 'Home', url: '/' },
      { value: 'About', url: '/about' },
      { value: 'Team', url: '/about/team' },
    ]);
    fixture.detectChanges();
    const chevrons = fixture.debugElement.queryAll(By.css('.breadcrumb-chevron'));
    expect(chevrons.length).toBe(2);
  });
});
