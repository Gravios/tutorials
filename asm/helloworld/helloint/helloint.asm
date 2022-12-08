

%macro exit 0
  mov rax, 60
  mov rdi, 0
  syscall
%endmacro

section .bss
  digitSpace resb 100
  digitSpacePos resb 8

section .text
  global _start


_start:
  mov rax, 1123
  call _printRAX
  exit

_printRAX:
  mov rcx, digitSpace           ;Start at the beginning of digitSpace
  mov rbx, 10                   ;insert newline char
  mov [rcx], rbx
  inc rcx
  mov [digitSpacePos], rcx


_printRAXLoop:
  mov rdx, 0
  mov rbx, 10
  div rbx
  push rax
  add rdx, 48                   ;ASCII offset to digits

  mov rcx, [digitSpacePos]
  mov [rcx], dl
  inc rcx
  mov [digitSpacePos], rcx

  pop rax
  cmp rax, 0
  jne _printRAXLoop

_printRAXLoop2:
  mov rcx, [digitSpacePos]

  mov rax, 1
  mov rdi, 1
  mov rsi, rcx
  mov rdx, 1
  syscall

  mov rcx, [digitSpacePos]
  dec rcx
  mov [digitSpacePos], rcx

  cmp rcx, digitSpace
  jge _printRAXLoop2

  ret
