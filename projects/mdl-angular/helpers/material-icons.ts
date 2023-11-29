import { inject } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

export function registerMaterialIcons(items: { [K: string | symbol]: string }) {
  const dom = inject(DomSanitizer);
  const mat = inject(MatIconRegistry);

  for (let icon in items) {
    mat.addSvgIcon(icon, dom.bypassSecurityTrustResourceUrl(items[icon]));
  }
}

export function registerInlineMaterialIcons(items: { [K: string | symbol]: string }) {
  const dom = inject(DomSanitizer);
  const mat = inject(MatIconRegistry);

  for (let icon in items) {
    mat.addSvgIconLiteral(icon, dom.bypassSecurityTrustHtml(items[icon]));
  }
}
